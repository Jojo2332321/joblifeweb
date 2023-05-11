const Router = require('express')
const router = new Router()
const ExpectedController = require('../controlers/ExpectedShiftsController')

router.post('/',ExpectedController.create)
router.get('/',ExpectedController.getAll)
router.delete('/:id', ExpectedController.delete)
module.exports = router