import {makeAutoObservable} from "mobx";

export default class ShiftsM{
    constructor() {
        this._companys = []
        this._positions= []
        this._companyType = []
        this._worker = []
        this._seelectedCopanys=[]
        this._shift = []
        this._workHourTemplates = []
        this._permit = []
        this._status = []
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
    setWorkerPermir(workPermit){
        this._permit = workPermit
    }

    get workerPermit(){
        return this._permit
    }
    setWorkerStatus(workerStatus){
        this._status = workerStatus
    }

    get workerStatus(){
        return this._status
    }

    get workHourTemplates(){
        return this._workHourTemplates
    }

}