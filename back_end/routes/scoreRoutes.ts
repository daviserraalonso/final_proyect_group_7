import { Router } from 'express'
import { getScore, insertScore } from '../controllers/ScoreController'

const router = Router()

router.get('/', getScore)
router.post('/', insertScore)

module.exports = router