import express, { NextFunction, Request, Response } from "express";
import apiRoutes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { webscoketConnect } from "./lib/messages/websocketServer";
import { jwtCheck } from "./middleware/authorization";
import { corsOptions } from "./middleware/corsOptions";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.WEB_URL,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});
webscoketConnect(io);

app.use(cors(corsOptions));
app.use(jwtCheck);
app.use("/api", apiRoutes);
app.get("/", (_: Request, res: Response, next: NextFunction) => {
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
