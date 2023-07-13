import express, { Request, Response } from "express";
// import cors from "cors";
import apiRoutes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";

import { webscoketConnect } from "./lib/messages/websocketServer";

const app = express();
const port = 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
webscoketConnect(io);

app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log("Server start on port 3000.");
});
