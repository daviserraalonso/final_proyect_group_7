"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriesController_1 = __importDefault(require("../controllers/CategoriesController"));
const router = express_1.default.Router();
router.get('/', CategoriesController_1.default.getAllCategories);
router.post('/', CategoriesController_1.default.createCategory);
module.exports = router;
