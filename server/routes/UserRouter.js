const Router = require('express')
const router = new Router()
const userController = require('../controlers/userController')
const authMiddelware = require('../middleware/authMiddelware')

router.post('/registration', userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddelware, userController.check)


module.exports = router