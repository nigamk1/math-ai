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
exports.handleAvatar = void 0;
const avatar_service_1 = require("../services/avatar.service");
/**
 * HTTP handler to generate avatar based on name and style.
 * Expects: { name: string, style: string }
 * Returns: { avatar: string (URL) }
 */
const handleAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, style } = req.body;
    // Validate input
    if (!name || !style) {
        return res.status(400).json({ error: 'Name and style are required.' });
    }
    try {
        // Generate avatar URL
        const avatarURL = yield (0, avatar_service_1.generateAvatar)(name, style);
        // Respond with the avatar URL
        return res.status(200).json({ avatar: avatarURL });
    }
    catch (error) {
        console.error('Error in handleAvatar:', error);
        return res.status(500).json({ error: 'Failed to generate avatar.' });
    }
});
exports.handleAvatar = handleAvatar;
