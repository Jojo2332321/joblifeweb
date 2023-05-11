const {Companys} = require("../models/models");
//
class CompanysController {
    async create(req, res){
        const {name,userid,companyTypeId  } = req.body
        const com = await Companys.create({name,userid,companyTypeId})
        return res.json(com)


    }
   /*zapomni findallcountrow*/
    async getAll(req, res){
        const com = await Companys.findAll()
        return res.json(com)

    }

    async delete(req, res) {
        const {id} = req.params
        const com = await Companys.destroy({where: {id: id}})
        if (com) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }
}

module.exports =new CompanysController()