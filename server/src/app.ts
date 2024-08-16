import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("Server is listening on port 4000");
});

interface IUser {
  id: string;
  name: string;
}

let users: IUser[] = [];

io.on("connection", (socket) => {
  console.log("user connected",socket.id);

  socket.on("newUser", (name:string) => {
    users.push({ id: socket.id, name: name });
    console.log(users);
    io.emit("users", users);
  });

  socket.on("triggerUpdate", () => {
    io.emit("update", users);
  });

  socket.on('newMsg',({id,msg})=>{
    socket.to(id).emit('receiveMsg',msg,socket.id)
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("users", users); 
    console.log("user disconnected");
  });
});
