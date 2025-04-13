"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tts_controller_1 = require("../controllers/tts.controller"); // Import the controller function
const router = express_1.default.Router();
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res).catch(next);
    };
};
// Route for generating TTS audio
router.post('/', asyncHandler(tts_controller_1.handleTTS)); // Use the controller function to handle the POST request
exports.default = router;
