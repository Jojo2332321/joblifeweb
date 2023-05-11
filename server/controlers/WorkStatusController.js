const {WorkStatus} = require("../models/models");

class WorkStatusController {
    async create(req, res) {
        const {name, userid} = req.body
        const workStatus = await WorkStatus.create({name, userid})
        return res.json(workStatus)

    }

    async getAll(req, res) {
        const workStatus = await WorkStatus.findAll()
        return res.json(workStatus)

    }

    async delete(req, res) {
        const {id} = req.params
        const workStatus = await WorkStatus.destroy({where: {id: id}})
        if (workStatus) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }
}
module.exports =new WorkStatusController()