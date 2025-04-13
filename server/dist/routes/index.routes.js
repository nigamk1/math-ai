"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const explain_routes_1 = __importDefault(require("./explain.routes"));
const tts_routes_1 = __importDefault(require("./tts.routes"));
const avatar_routes_1 = __importDefault(require("./avatar.routes"));
const router = express_1.default.Router();
// Use route files for modularity
router.use('/api/explain', explain_routes_1.default);
router.use('/api/tts', tts_routes_1.default);
router.use('/api/avatar', avatar_routes_1.default);
exports.default = router;
