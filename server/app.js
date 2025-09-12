import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import patientRouter from "./routes/patientRoute"

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", ({ roomId }) => {
        socket.join(roomId);
        console.log(socket.id, "joined", roomId);
    });

    socket.on("offer", ({ roomId, sdp }) => {
        socket.to(roomId).emit("offer", { sdp });
    });

    socket.on("answer", ({ roomId, sdp }) => {
        socket.to(roomId).emit("answer", { sdp });
    });

    socket.on("end", ({ roomId }) => {
        socket.to(roomId).emit("end")
    })

    socket.on("ice-candidate", ({ roomId, candidate }) => {
        socket.to(roomId).emit("ice-candidate", { candidate });
    });

    socket.on("disconnect", () => {
        console.log("disconnected:", socket.id);
    });

});

app.use("/patient", patientRouter)

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello World!" });
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});