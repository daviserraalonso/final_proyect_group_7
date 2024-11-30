import { Router } from 'express'
import { insertScore } from '../controllers/ScoreController'

const router = Router()

router.post('/', insertScore)

module.exports = router