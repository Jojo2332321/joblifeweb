const {Workers} = require("../models/models");


class WorkersController {
    async create(req, res){
        const {firstname,surname,number, age, citizenship, userid, workPermitId, workStatusId} = req.body
        const work = await Workers.create({firstname,surname,number, age, citizenship, userid, workPermitId, workStatusId})
        return res.json(work)
    }
    /*Не работает. zapomni findallcountrow*/
    async getAll(req, res){
        const work = await Workers.findAll()
        return res.json(work)
    }

    async getByName(req, res){
        const {firstname} = req.params;
        const workers = await Workers.findAll({
            where: {firstname:firstname}
        });
        return res.json(workers)
    }

    async getBySurname(req, res){
        const {surname} = req.params;
        const workers = await Workers.findAll({
            where: {surname:surname}
        });
        return res.json(workers)
    }

    async getByCitizenship(req, res){
        const {citizenship} = req.params;
        const workers = await Workers.findAll({
            where: {citizenship:citizenship}
        });
        return res.json(workers)
    }
    async delete(req, res){
        const {id} = req.params;
        const deletedRowsCount = await Workers.destroy({
            where: {id: id}
        });
        return res.json({deletedRowsCount:deletedRowsCount})
    }

}

module.exports =new WorkersController()