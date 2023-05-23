import {$authHost, $host} from "./index";
export const createCompanys= async (companys) =>
{
    const {data} = await $host.post('api/companys', companys)
    return data;
}

export const fetchCompanys = async () =>
{
    const {data} = await $host.get('api/companys')
    return data
}

export const createCompanyType= async (companyType) =>
{
    const {data} = await $host.post('api/companyType', companyType)
    return data
}

export const fetchCompanyType = async () =>
{
    const {data} = await $host.get('api/companyType')
    return data
}

export const createWorkHourTemplates= async (workHourTemplates) =>
{
    const {data} = await $host.post('api/workHoursTemplates',workHourTemplates)
    return data
}
export const fetchWorkHourTemplates = async () =>
{
    const {data} = await $host.get('api/workHoursTemplates')
    return data
}


export const createPositions= async (positions) =>
{
    const {data} = await $host.post('api/positions', positions)
    return data
}

export const createWorkStatus=async (workStatus) =>
{
const {data} = await $host.post('api/workStatus', workStatus)
return data
}
export const createWorkPermit=async (workPermit) =>
{
    const {data} = await $host.post('api/workPermit', workPermit)
    return data
}

export const fetchWorkPermit=async () =>
{
    const {data} = await $host.get('api/workPermit')
    return data
}

export const fetchWorkStatus=async () =>
{
    const {data} = await $host.get('api/workStatus')
    return data
}
export const fetchPositions = async () =>
{
    const {data} = await $host.get('api/positions')
    return data
}

export const createWorker= async (worker) =>
{
    const {data} = await $host.post('api/workers', worker)
    return data
}

export const fetchWorker = async () =>
{
    const {data} = await $host.get('api/workers')
    return data
}

export const createShift = async (shift)=>
{
    const {data} = await $host.post('api/shifts', shift)
    return data
}

export const fetchShift = async () =>
{
    const {data} = await $host.get('api/shifts')
    return data
}

export const createExpectedShift = async (expectedShifts)=>
{
    const {data} = await $host.post('api/expectedShifts/', expectedShifts)
    return data
}

export const fetchExpectedShift = async () =>
{
    const {data} = await $host.get('api/expectedShifts/')
    return data
}

export const deleteWorker = async (id) => {
    const response = await $host.delete('api/workers/' + id);
    return response.data;
}

export const deleteCompanyType = async (id)=> {
    const response = await $host.delete('api/companyType/' + id);
    return response.data
}

export const deleteCompany = async (id)=> {
    const response = await $host.delete('api/companys/' + id);
    return response.data
}
export const deleteShift = async (id)=> {
    const response = await $host.delete('api/shifts/' + id);
    return response.data
}

export const updateWorker = async (id, worker) => {
    const {data} = await $host.put('api/workers/' + id, worker);
    return data;
}
