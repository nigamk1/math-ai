"use strict";
// import { Request, Response } from 'express';
// import axios from 'axios';
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
exports.handleTTS = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const handleTTS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'No text provided for TTS.' });
        }
        if (text.length > 500) {
            return res.status(400).json({ error: 'Text exceeds the maximum character limit (500 characters).' });
        }
        const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
        const scriptPath = path_1.default.resolve(__dirname, '../tts.py');
        const outputPath = path_1.default.resolve(__dirname, '../output.mp3');
        const escapedText = text.replace(/"/g, '\\"');
        (0, child_process_1.exec)(`${pythonCmd} "${scriptPath}" "${escapedText}"`, (err, stdout, stderr) => {
            if (err) {
                console.error('TTS generation failed:', stderr);
                return res.status(500).json({ error: 'Failed to generate TTS audio using gTTS.' });
            }
            fs_1.default.readFile(outputPath, (err, data) => {
                if (err) {
                    console.error('Failed to read audio file:', err);
                    return res.status(500).json({ error: 'Could not read generated audio file.' });
                }
                res.set('Content-Type', 'audio/mpeg');
                res.send(data);
                // Clean up after sending
                fs_1.default.unlink(outputPath, () => { });
            });
        });
    }
    catch (error) {
        console.error('Unexpected error:', error.message);
        return res.status(500).json({ error: 'An unexpected error occurred during TTS generation.' });
    }
});
exports.handleTTS = handleTTS;
