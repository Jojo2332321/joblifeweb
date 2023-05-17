const Router = require('express')
const router = new Router()
const WorkersController = require('../controlers/workersController')

router.post('/',WorkersController.create)
router.get('/',WorkersController.getAll)
router.delete('/:id', WorkersController.delete)
router.get('/:firstname', WorkersController.getByName)
router.get('/:surname', WorkersController.getBySurname)
router.get('/:citizenship', WorkersController.getByCitizenship)
router.put('/:id', WorkersController.update);

module.exports = router
