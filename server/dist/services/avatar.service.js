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
exports.generateAvatar = void 0;
const axios_1 = __importDefault(require("axios"));
// Function to generate an avatar
const generateAvatar = (name, style) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Example: Call a third-party avatar API (replace with your actual avatar API)
        const response = yield axios_1.default.get(`https://api.example.com/avatar`, {
            params: { name, style },
        });
        // Return the avatar URL from the API response
        return response.data.avatarURL; // Adjust based on the API response structure
    }
    catch (error) {
        console.error('Error generating avatar:', error);
        throw new Error('Failed to generate avatar.');
    }
});
exports.generateAvatar = generateAvatar;
