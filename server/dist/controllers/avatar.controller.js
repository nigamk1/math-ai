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
// Async handler for avatar requests
const handleAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, style } = req.body;
    // Validate input
    if (!name || !style) {
        return res.status(400).json({ error: 'Name and style are required.' });
    }
    try {
        // Call the service to generate the avatar
        const avatarURL = yield (0, avatar_service_1.generateAvatar)(name, style);
        // Send the avatar URL in the response
        res.status(200).json({ avatar: avatarURL });
    }
    catch (error) {
        console.error('Error in handleAvatar:', error);
        res.status(500).json({ error: 'Failed to generate avatar.' });
    }
});
exports.handleAvatar = handleAvatar;
