const Router = require('express')
const router = new Router()
const WorkHourTemplatesController = require('../controlers/WorkHourTemplatesController')

router.post('/',WorkHourTemplatesController.create)
router.get('/',WorkHourTemplatesController.getAll)
router.delete('/:id', WorkHourTemplatesController.delete)
module.exports = router