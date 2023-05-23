const sequelize = require('../db')
const {DataTypes, UnknownConstraintError} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Firma = sequelize.define('firma', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const WorkStatus = sequelize.define('work_status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    userid:{type:DataTypes.INTEGER}
});

const WorkPermit = sequelize.define('work_permit', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    userid:{type:DataTypes.INTEGER}
});

const Workers = sequelize.define('worker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    number: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    citizenship: {type: DataTypes.STRING},
    userid:{type:DataTypes.INTEGER},
/*    telegramChatId:{type:DataTypes.INTEGER}*/
});

const Notes = sequelize.define('note', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT},
    userid:{type:DataTypes.INTEGER}
});

const ExpectedShifts = sequelize.define('expected_shift', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Date: {type: DataTypes.DATEONLY},
    userid:{type:DataTypes.INTEGER}
});

const WorkHourTemplates = sequelize.define('workHour_template', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    startTime: {type: DataTypes.TIME},
    endTime: {type: DataTypes.TIME},
    userid:{type:DataTypes.INTEGER}
});

const CompanyType = sequelize.define('companyType', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    userid:{type:DataTypes.INTEGER}
});

const Companys = sequelize.define('company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
    userid:{type:DataTypes.INTEGER}
});

const Positions = sequelize.define('position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    userid:{type:DataTypes.INTEGER}
});

const Shifts = sequelize.define('shift', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    startDate: {type: DataTypes.DATEONLY},
    userid:{type:DataTypes.INTEGER}
});




User.hasOne(Firma)
Firma.belongsTo(User)

Firma.hasMany(Shifts)
Shifts.belongsTo(Firma)

Workers.hasOne(Notes)
Notes.belongsTo(Workers)

WorkPermit.hasMany(Workers)
Workers.belongsTo(WorkPermit)

WorkStatus.hasMany(Workers)
Workers.belongsTo(WorkStatus)

Workers.hasMany(ExpectedShifts)
ExpectedShifts.belongsTo(Workers)

Workers.hasMany(Shifts)
Shifts.belongsTo(Workers)

Companys.hasMany(Shifts)
Shifts.belongsTo(Companys)

Positions.hasMany(Shifts)
Shifts.belongsTo(Positions)

CompanyType.hasMany(Companys);
Companys.belongsTo(CompanyType);

WorkHourTemplates.hasMany(Shifts)
Shifts.belongsTo(WorkHourTemplates)


module.exports = {
    User,//
    Firma,//
    Workers,//
    Notes,//
    Shifts,//
    ExpectedShifts,//
    Companys,//
    Positions,//
    WorkStatus,//
    WorkPermit,//
    WorkHourTemplates,//
    CompanyType,//

}

