const Router = require('express')
const router = new Router()
const WorkStatusController = require('../controlers/WorkStatusController')

router.post('/',WorkStatusController.create)
router.get('/',WorkStatusController.getAll)
router.delete('/:id', WorkStatusController.delete)
module.exports = router