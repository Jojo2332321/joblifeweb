import {makeAutoObservable} from "mobx";
export default class FirmaM{
    constructor() {
        this._userId = null;
        this._firmaId = null;
        makeAutoObservable(this);
    }

    setUserId(userId) {
        this._userId = userId;
    }

    setFirmaId(companyId) {
        this._firmaId = companyId;
    }

    get userId() {
        return this._userId;
    }

    get firmaId() {
        return this._firmaId;
    }
}

