"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const audio_routes_1 = __importDefault(require("./audio.routes"));
const gpt_routes_1 = __importDefault(require("./gpt.routes"));
const tts_routes_1 = __importDefault(require("./tts.routes"));
const dld_routes_1 = __importDefault(require("./dld.routes"));
const router = express_1.default.Router();
// Register routes
router.use("/api/audio", audio_routes_1.default);
router.use("/api/gpt", gpt_routes_1.default);
router.use("/api/tts", tts_routes_1.default);
router.use("/api/dld", dld_routes_1.default);
exports.default = router;
