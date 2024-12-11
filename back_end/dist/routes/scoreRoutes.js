"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ScoreController_1 = require("../controllers/ScoreController");
const router = (0, express_1.Router)();
router.get('/', ScoreController_1.getScore);
router.get('/:userId/comments', ScoreController_1.getComments);
router.post('/', ScoreController_1.insertScore);
module.exports = router;
