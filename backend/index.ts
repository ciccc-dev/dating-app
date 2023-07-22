import express, { Request, Response } from "express";
import apiRoutes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { webscoketConnect } from "./lib/messages/websocketServer";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.WEB_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
webscoketConnect(io);

app.use("/api", apiRoutes);
app.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello World!");
  } catch (err) {}
});

server.listen(port, () => {
  console.log(`Server start on port ${port}.`);
});
