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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTTS = void 0;
const axios_1 = __importDefault(require("axios"));
// Function to generate TTS audio
const generateTTS = (text, voice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Example: Call a third-party TTS API (replace with your actual TTS API)
        const response = yield axios_1.default.post('https://api.example.com/tts', { text, voice }, { responseType: 'arraybuffer' } // Ensure the response is returned as a Buffer
        );
        // Return the audio buffer
        return Buffer.from(response.data);
    }
    catch (error) {
        console.error('Error generating TTS:', error);
        throw new Error('Failed to generate TTS audio.');
    }
});
exports.generateTTS = generateTTS;
