"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const explain_controller_1 = require("../controllers/explain.controller"); // Import the existing function
const router = express_1.default.Router();
// Async middleware wrapper to handle errors
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res).catch(next);
    };
};
// Wrap the async handler with the middleware
router.post('/', asyncHandler(explain_controller_1.handleExplain));
exports.default = router;
