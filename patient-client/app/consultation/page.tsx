"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function ConsultationPage() {

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const [socket, setSocket] = useState<any>(null);
    const [pc, setPc] = useState<RTCPeerConnection | null>(null);
    const [roomId] = useState("room-123"); // static for now

    useEffect(() => {
        const s = io("http://localhost:4000");
        setSocket(s);

        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        setPc(peer);

        peer.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                s.emit("ice-candidate", { roomId, candidate: event.candidate });
            }
        };

        s.emit("join-room", { roomId });

        s.on("offer", async ({ sdp }) => {
            await peer.setRemoteDescription(new RTCSessionDescription(sdp));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            s.emit("answer", { roomId, sdp: answer });
        });

        s.on("answer", async ({ sdp }) => {
            await peer.setRemoteDescription(new RTCSessionDescription(sdp));
        });


        s.on("ice-candidate", async ({ candidate }) => {
            try {
                await peer.addIceCandidate(candidate);
            } catch (err) {
                console.error("Error adding ice candidate", err);
            }
        });


        return () => {
            s.disconnect();
            peer.close();
        }

    }, [roomId]);

    const startCall = async () => {
        if (!pc || !socket) return;
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }

        // Add tracks to peer connection
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        // Caller creates offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { roomId, sdp: offer });
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <video ref={localVideoRef} autoPlay playsInline muted className="w-64 border" />
            <video ref={remoteVideoRef} autoPlay playsInline className="w-64 border" />
            <button
                onClick={startCall}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
                Start Call
            </button>
        </div>
    );
}