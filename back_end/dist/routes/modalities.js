"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ModalityController_1 = __importDefault(require("../controllers/ModalityController"));
const router = express_1.default.Router();
router.get('/', ModalityController_1.default.getAllModalities);
router.post('/', ModalityController_1.default.createModality);
module.exports = router;
