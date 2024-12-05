import { Router } from 'express'
import { getComments, getScore, insertScore } from '../controllers/ScoreController'

const router = Router()

router.get('/', getScore)
router.get('/:userId/comments', getComments )
router.post('/', insertScore)

module.exports = router