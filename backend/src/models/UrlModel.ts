import mongoose, { Schema } from "mongoose";
import { UrlItem } from "../types";

const urlSchema = new Schema<UrlItem>(
	{
		originalUrl: {
			type: String,
			required: true,
			index: true,
		},
		shortUrl: {
			type: String,
			required: true,
			unique: true,
		},
		accessCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Url = mongoose.model<UrlItem>("Url", urlSchema);

export default Url;
