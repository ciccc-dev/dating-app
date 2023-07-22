import express, { NextFunction, Request, Response } from "express";
import apiRoutes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";

import { webscoketConnect } from "./lib/messages/websocketServer";

const app = express();
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
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello World");
  } catch (err) {
    next(err);
  }
});

// Error Handling
app.use((err: any, req: Request, res: Response, next: any) => {
  res.status(500).json({
    error: { message: "standard error", code: "ServerError", err },
  });
  next();
});

server.listen(port, () => {
  console.log(`Server start on port ${port}.`);
});
