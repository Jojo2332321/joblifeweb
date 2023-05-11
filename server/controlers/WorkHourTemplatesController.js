const {WorkHourTemplates} = require("../models/models");

class WorkPermitController {
    async create(req, res){
        const {name,description,startTime,endTime,userid} = req.body
        const hourTemplates = await WorkHourTemplates.create({name,description,startTime,endTime,userid})
        return res.json(hourTemplates)
    }

    async getAll(req, res){
        const hourTemplates = await WorkHourTemplates.findAll()
        return res.json(hourTemplates)
    }

    async delete(req, res){
        const {id} = req.params;
        const deletedRowsCount = await WorkHourTemplates.destroy({
            where: {id: id}
        });
        return res.json({deletedRowsCount:deletedRowsCount})
    }
}

module.exports = new WorkPermitController()
