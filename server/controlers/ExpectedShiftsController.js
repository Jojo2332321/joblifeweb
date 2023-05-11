const {ExpectedShifts} = require("../models/models");

class ExpectedShiftsController {
    async create(req, res) {
        const {Date, userID} = req.body
        const expectedShift = await ExpectedShifts.create({Date, userID})
        return res.json(expectedShift)
    }

    async getAll(req, res) {
        const expectedShifts = await ExpectedShifts.findAll()
        return res.json(expectedShifts)
    }

    async delete(req, res) {
        const {id} = req.params
        const expectedShift = await ExpectedShifts.destroy({where: {id: id}})
        if (expectedShift) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }
}
module.exports = new ExpectedShiftsController()
