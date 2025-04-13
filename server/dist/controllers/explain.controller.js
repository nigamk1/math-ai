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
exports.handleExplain = void 0;
const openai_service_1 = require("../services/openai.service");
// Async handler for the explain endpoint
const handleExplain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic, style } = req.body;
    // Validate the request body
    if (!topic || !style) {
        return res.status(400).json({ error: 'Topic and style are required.' });
    }
    try {
        // Generate the explanation using the OpenAI service
        const explanation = yield (0, openai_service_1.generateExplanation)(topic, style);
        return res.status(200).json({ explanation });
    }
    catch (error) {
        console.error('Error in handleExplain:', error);
        // Handle rate limiting or quota errors
        if (error.message.includes('Rate limit exceeded') ||
            error.message.includes('insufficient quota')) {
            return res.status(429).json({ error: error.message });
        }
        // Handle other errors
        return res.status(500).json({ error: 'Failed to generate explanation.' });
    }
});
exports.handleExplain = handleExplain;
