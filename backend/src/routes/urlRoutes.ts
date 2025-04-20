import { Router } from "express";
import { createShortUrl } from "../controllers/urlController";

const router = Router();

router.route("/shorten").post(createShortUrl);

export default router;
