const Router = require('express')
const router = new Router()
const ShiftsController = require('../controlers/ShiftsController')

router.post('/',ShiftsController.create)
router.get('/',ShiftsController.getAll)
router.delete('/:id', ShiftsController.delete)

module.exports = router