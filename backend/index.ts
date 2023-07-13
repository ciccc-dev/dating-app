import express, { Request, Response } from "express";
import apiRoutes from "./routes";

const app = express();
const port = 3000;

app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Backend Server starts running...`);
});
