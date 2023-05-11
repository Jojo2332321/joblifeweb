const Router = require('express')
const router = new Router()
const NoteController = require('../controlers/NoteController')

router.post('/',NoteController.create)
router.get('/',NoteController.getAll)
router.delete('/:id', NoteController.delete)
module.exports = router