const Router = require('express')
const router = new Router()
const FirmaConntroller = require('../controlers/FirmaController')

router.post('/',FirmaConntroller.create)


module.exports = router