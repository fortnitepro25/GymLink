require("dotenv").config();
const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err.message));

// Socket.io Chat Logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    io.to(room).emit("receiveMessage", {
      user: "System",
      text: `A user joined room: ${room}`,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", {
      user: data.user || "Anonymous",
      text: data.text,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
