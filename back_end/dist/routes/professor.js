"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProfessorController_1 = require("../controllers/ProfessorController");
const router = express_1.default.Router();
router.get('/:professorId/students', ProfessorController_1.getStudentsByProfessor);
module.exports = router;