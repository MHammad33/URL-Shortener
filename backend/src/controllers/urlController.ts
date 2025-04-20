import { Request, Response } from "express";
import { v4 } from "uuid";
import Url from "../models/UrlModel";

export const createShortUrl = async (
	req: Request<{}, {}, { originalUrl: string }>,
	res: Response
) => {
	const { originalUrl } = req.body;

	if (!originalUrl || typeof originalUrl !== "string") {
		res.status(400).json({ error: "Invalid or missing URL." });
		return;
	}

	const shortUrl = v4().substring(0, 10);

	console.log("Short URL: ", shortUrl);

	try {
		const createdUrl = await Url.create({
			originalUrl,
			shortUrl,
			accessCount: 0,
		});

		res.status(201).json(createdUrl);
	} catch (error) {
		res.status(500).json({ error: "Failed to create short URL." });
	}
};
