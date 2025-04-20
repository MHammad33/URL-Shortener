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

export const getShortenUrls = async (_req: Request, res: Response) => {
	const shortenUrls = await Url.find({});
	res.status(200).json(shortenUrls);
};

export const deleteUrlById = async (
	req: Request<{ urlId: string }, {}, {}>,
	res: Response
) => {
	const { urlId } = req.params;
	const shortenUrl = await Url.findById(urlId);

	if (!shortenUrl) {
		res.status(404).send("Url not found");
		return;
	}

	const deletedUrl = await Url.findByIdAndDelete(urlId);
	res.status(200).send(deletedUrl);
};

export const redirectToOriginalURL = async (
	req: Request<{ shortUrl: string }, {}, {}>,
	res: Response
) => {
	console.log("HEy");

	const { shortUrl } = req.params;
	const url = await Url.findOne({ shortUrl });

	if (!url) {
		res.status(404).send("Url not found");
		return;
	}

	url.accessCount++;
	await url.save();

	res.redirect(url.originalUrl);
};
