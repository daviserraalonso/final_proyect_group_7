"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriesController_1 = __importDefault(require("../controllers/CategoriesController"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        await CategoriesController_1.default.getAllCategories(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});
router.post('/', CategoriesController_1.default.createCategory);
module.exports = router;
