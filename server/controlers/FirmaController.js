const {Firma} = require("../models/models");

class FirmaController{
    async create(req, res){
    const {userid} = req.body
        const firma = await Firma.create({userid})
        return res.json(firma)
    }

/*    async getAll(req, res) {
        const firma = await Firma.findAll()
        return res.json(firma)
    }

    async delete(req, res) {
        const {id} = req.params
        const firma = await Firma.destroy({where: {id: id}})
        if (firma) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }*/
}

module.exports = new FirmaController()