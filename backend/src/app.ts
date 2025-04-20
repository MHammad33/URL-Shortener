import express, { Express } from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes";
import { redirectToOriginalURL } from "./controllers/urlController";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/urls", urlRoutes);

// Redirect to original url
app.get("/:shortUrl", redirectToOriginalURL);

export default app;
