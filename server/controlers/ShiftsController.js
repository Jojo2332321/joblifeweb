const {Shifts} = require("../models/models");

class ShiftsController {
    async create(req, res){
        const {startDate,positionId, workHourTemplateId, workerId, companyId,userid} = req.body
        const shift = await Shifts.create({startDate,positionId, workHourTemplateId, workerId, companyId,userid})
        return res.json(shift)
    }

    async getAll(req, res){
        const shift = await Shifts.findAll()
        return res.json(shift)
    }
    async delete(req, res) {
        const {id} = req.params
        const shift = await Shifts.destroy({
            where: {id}
        });
        return res.json({shift:shift})

    }
}

module.exports =new ShiftsController()