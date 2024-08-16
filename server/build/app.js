"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
server.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
let users = [];
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("newUser", (name) => {
        users.push({ id: socket.id, name: name });
        console.log(users);
        io.emit("users", users);
    });
    socket.on("triggerUpdate", () => {
        io.emit("update", users);
    });
    socket.on('newMsg', ({ id, msg }) => {
        socket.to(id).emit('receiveMsg', msg, socket.id);
    });
    socket.on("disconnect", () => {
        users = users.filter((user) => user.id !== socket.id);
        io.emit("users", users);
        console.log("user disconnected");
    });
});
