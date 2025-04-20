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
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (_, ret) => {
				ret.id = ret._id;

				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

const Url = mongoose.model<UrlItem>("Url", urlSchema);

export default Url;
