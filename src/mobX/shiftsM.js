import {makeAutoObservable} from "mobx";

export default class ShiftsM{
    constructor() {
        this._companys = []
        this._positions= []
        this._companyType = []
        this._worker = [
/*            {id:1, firstname:"Artem", surname:"Kordas", work_permit:"Student", number:"11111", age:"23", citizenship:"Rus", work_status:23},
            {id:2, firstname:"Oleg", surname:"Nepej", work_permit:"Student", number:"11111", age:"23", citizenship:"Rus", work_status:12},
            {id:3, firstname:"John", surname:"Borsh", work_permit:"Student", number:"11111", age:"43", citizenship:"Ceh", work_status:12},
            {id:4, firstname:"Jack", surname:"Syr", work_permit:"Student", number:"11111", age:"55", citizenship:"Indian", work_status:12},
            {id:5, firstname:"Popouseka", surname:"Volnistova", work_permit:"Student", number:"11111", age:"55", citizenship:"Ukr", work_status:23}*/
        ]

        this._seelectedCopanys={}
        this._shift = []
        this._workHourTemplates = []

        makeAutoObservable(this)
    }

    setWorkHourTemplates(workHourTemplates){
        this._workHourTemplates = workHourTemplates
    }
    setShift(shift){
        this._shift = shift
    }
    setCompanys(companys){
        this._companys = companys
    }

    setPositions(positions){
        this._positions = positions
    }

    setWorker(worker){
        this._worker = worker
    }

    setSeelectedCopanys(seelectedCopanys){
        this._seelectedCopanys = seelectedCopanys
    }

    setCompanyType(companyType){
        this._companyType = companyType
    }

    get shift(){
        return this._shift
    }
    get companys(){
       return this._companys
    }

    get positions(){
       return this._positions
    }

    get worker(){
       return this._worker
    }

    get seelectedCopanys(){
        return this._seelectedCopanys
    }

    get companyType(){
        return this._companyType
    }

}