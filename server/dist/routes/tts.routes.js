"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tts_controller_1 = require("../controllers/tts.controller");
const asyncHandler_1 = require("../service/asyncHandler");
const router = express_1.default.Router();
// Endpoint to handle TTS generation
router.post('/', (0, asyncHandler_1.asyncHandler)(tts_controller_1.handleTTS));
exports.default = router;
