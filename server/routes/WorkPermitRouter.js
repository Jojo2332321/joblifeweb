const Router = require('express')
const router = new Router()
const WorkPermitController = require('../controlers/WorkPermitController')

router.post('/',WorkPermitController.create)
router.get('/',WorkPermitController.getAll)
router.delete('/:id', WorkPermitController.delete)
module.exports = router