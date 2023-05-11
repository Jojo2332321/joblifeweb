const {CompanyType, User} = require("../models/models");
//
class CompanyTypeController {
    async create(req, res){
        const {name,userid} = req.body
        const comType = await CompanyType.create({name,userid})
        return res.json(comType)
    }

    async getAll(req, res){
        const comType = await CompanyType.findAll()
        return res.json(comType)
    }

    async delete(req, res) {
        const {id} = req.params
        const comType = await CompanyType.destroy({where: {id: id}})
        if (comType) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }
}

module.exports = new CompanyTypeController()
