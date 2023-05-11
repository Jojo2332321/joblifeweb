const Router = require('express')
const router = new Router()
const CompanyTypeController = require('../controlers/CompanyTypeController')


router.post('/',CompanyTypeController.create)
router.get('/',CompanyTypeController.getAll)
router.delete('/:id', CompanyTypeController.delete)
module.exports = router