import dotenv from "dotenv";
import connectDB from "./db";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3001;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`[server]: Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((error) => console.log("DB connection failed", error));
