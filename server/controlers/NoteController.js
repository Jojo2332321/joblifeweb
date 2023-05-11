const {Notes} = require("../models/models");

class NoteController {
    async create(req, res) {
        const {text} = req.body
        const note = await NoteController.create({text})
        return res.json(note)
    }

    async getAll(req, res) {
        const note = await NoteController.findAll()
        return res.json(note)
    }

    async delete(req, res) {
        const {id} = req.params
        const note = await NoteController.destroy({where: {id: id}})
        if (note) {
            return res.json({message: 'Record deleted successfully'});
        } else {
            return res.json({message: 'Record not found'});
        }
    }
}

module.exports =new NoteController()