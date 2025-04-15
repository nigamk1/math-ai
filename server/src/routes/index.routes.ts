import express from "express";

import audioRoutes from "./audio.routes";
import gptRoutes from "./gpt.routes";
import ttsRoutes from "./tts.routes";
import dldRoutes from "./dld.routes";

const router = express.Router();

// Register routes

router.use("/api/audio", audioRoutes);
router.use("/api/gpt", gptRoutes);
router.use("/api/tts", ttsRoutes);
router.use("/api/dld", dldRoutes);

export default router;
