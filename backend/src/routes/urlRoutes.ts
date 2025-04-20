import { Router } from "express";
import {
	createShortUrl,
	deleteUrlById,
	getShortenUrls,
} from "../controllers/urlController";

const router = Router();

router.route("/").get(getShortenUrls);
router.route("/shorten").post(createShortUrl);
router.route("/:urlId").delete(deleteUrlById);

export default router;
