const {WorkPermit, Positions} = require("../models/models");

class WorkPermitController {
    async create(req, res){
        const {name,userid} = req.body
        const permit = await WorkPermit.create({name,userid})
        return res.json(permit)
    }

    async getAll(req, res){
        const permits = await WorkPermit.findAll()
        return res.json(permits)
    }

    async delete(req, res) {
        const {id} = req.params
        const permits = await WorkPermit.destroy({where: {id: id}})
        if (permits) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }
}

module.exports = new WorkPermitController()
