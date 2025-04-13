"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTTS = void 0;
const tts_service_1 = require("../services/tts.service");
// Async handler for TTS requests
const handleTTS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, voice } = req.body;
    // Validate input
    if (!text || !voice) {
        return res.status(400).json({ error: 'Text and voice are required.' });
    }
    try {
        // Call the service to generate TTS audio
        const audioBuffer = yield (0, tts_service_1.generateTTS)(text, voice);
        // Send the audio file in the response
        res.setHeader('Content-Type', 'audio/mpeg');
        res.status(200).send(audioBuffer);
    }
    catch (error) {
        console.error('Error in handleTTS:', error);
        res.status(500).json({ error: 'Failed to generate TTS audio.' });
    }
});
exports.handleTTS = handleTTS;
