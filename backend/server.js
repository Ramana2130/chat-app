import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";



dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running ...${PORT}`);
});
