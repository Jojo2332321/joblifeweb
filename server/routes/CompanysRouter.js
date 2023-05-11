const Router = require('express')
const router = new Router()
const ComapanysController = require('../controlers/CompanysController')

router.post('/',ComapanysController.create)
router.get('/',ComapanysController.getAll)
router.delete('/:id', ComapanysController.delete)


module.exports = router