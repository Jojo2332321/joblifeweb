const {Workers} = require("../models/models");


class WorkersController {
    async create(req, res) {
        const {firstname, surname, number, age, citizenship, userid, workPermitId, workStatusId} = req.body
        const work = await Workers.create({
            firstname,
            surname,
            number,
            age,
            citizenship,
            userid,
            workPermitId,
            workStatusId
        })
        return res.json(work)
    }

    /*Не работает. zapomni findallcountrow*/
    async getAll(req, res) {
        const work = await Workers.findAll()
        return res.json(work)
    }

    async getByName(req, res) {
        const {firstname} = req.params;
        const workers = await Workers.findAll({
            where: {firstname: firstname}
        });
        return res.json(workers)
    }

    async getBySurname(req, res) {
        const {surname} = req.params;
        const workers = await Workers.findAll({
            where: {surname: surname}
        });
        return res.json(workers)
    }

    async getByCitizenship(req, res) {
        const {citizenship} = req.params;
        const workers = await Workers.findAll({
            where: {citizenship: citizenship}
        });
        return res.json(workers)
    }

    async delete(req, res) {
        const {id} = req.params;
        const deletedRowsCount = await Workers.destroy({
            where: {id: id}
        });
        return res.json({deletedRowsCount: deletedRowsCount})
    }

    async update(req, res) {
        const {id} = req.params;
        const {firstname, surname, number, age, citizenship} = req.body;

        // Находим работника по id
        const worker = await Workers.findOne({ where: { id } });

        // Обновляем поля работника
        if (firstname) worker.firstname = firstname;
        if (surname) worker.surname = surname;
        if (number) worker.number = number;
        if (age) worker.age = age;
        if (citizenship) worker.citizenship = citizenship;

        // Сохраняем обновленного работника
        await worker.save();

        return res.json(worker);
    }

}

module.exports = new WorkersController()