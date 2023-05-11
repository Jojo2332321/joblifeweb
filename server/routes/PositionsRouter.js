const Router = require('express')
const router = new Router()
const PositionsController = require('../controlers/PositionsController')

router.post('/', PositionsController.create)
router.get('/', PositionsController.getAll)
router.delete('/:id', PositionsController.delete)
module.exports = router