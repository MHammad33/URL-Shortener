import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (_req, res) => {
	res.send("Hello from Express + TypeScript!");
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
