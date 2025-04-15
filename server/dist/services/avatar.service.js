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
exports.generateAvatar = void 0;
/**
 * Generates an avatar URL using DiceBear API.
 * @param name - The unique seed for avatar (e.g., username).
 * @param style - The avatar style (e.g., "adventurer", "pixel-art").
 * @returns The direct URL to the generated SVG avatar.
 */
const generateAvatar = (name, style) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Just build the URL – no need to call the API
        const avatarURL = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(name)}`;
        return avatarURL;
    }
    catch (error) {
        console.error('Error generating avatar URL:', error);
        throw new Error('Failed to generate avatar URL.');
    }
});
exports.generateAvatar = generateAvatar;
