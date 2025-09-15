// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import { RTCView, mediaDevices, RTCPeerConnection, MediaStream } from "react-native-webrtc";

export default function VideoCall() {

    //     const { roomId } = useLocalSearchParams<{ roomId: string }>();
    //     const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    //     useEffect(() => {
    //         (async () => {
    //             const stream = await mediaDevices.getUserMedia({
    //                 audio: true,
    //                 video: true,
    //             });
    //             setLocalStream(stream);
    //         })();
    //     }, []);


    //     return (
    //         <View style={{ flex: 1, backgroundColor: "black" }}>
    //             {localStream && (
    //                 <RTCView
    //                     streamURL={localStream.toURL()}
    //                     style={{ flex: 1 }}
    //                 />
    //             )}
    //         </View>
    //     );
}
