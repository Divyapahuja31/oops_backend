import express, { Application } from "express";
import complaintRouter from "./routes/complaint.routes";
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", complaintRouter);

app.use(errorHandler);

export default app;