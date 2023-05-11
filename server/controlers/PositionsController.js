const {Positions, CompanyType} = require ('../models/models')
class PositionsController {
    async create(req, res){
        const {name,userid} = req.body
        const positions = await Positions.create({name,userid})
        return res.json(positions)
    }

    async getAll(req, res){
        const positions = await Positions.findAll()
        return res.json(positions)
    }

    async delete(req, res) {
        const {id} = req.params
        const positions = await Positions.destroy({where: {id: id}})
        if (positions) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }
}

module.exports = new PositionsController()