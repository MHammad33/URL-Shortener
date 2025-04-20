import express, { Express } from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/urls", urlRoutes);

export default app;
