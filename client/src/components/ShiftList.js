import React, {useContext, useEffect} from 'react';
import WorkerCard from './WorkerCard';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchShift, fetchWorker} from "../http/ShiftsAPI";
const ShiftList = observer(() => {
    const {shifts}=useContext(Context)
    useEffect(()=>{
        fetchWorker().then(data =>shifts.setWorker(data))
        fetchShift().then(data=>shifts.setShift(data))
    },[])



    const Delete = (workerId) => {
        // логика удаления работника
    };


    return (
        <div>
            {shifts.worker.map(worker => (
                <WorkerCard
                    key={worker.id}
                    firstName={worker.firstname}
                    surname ={worker.surname}
                    onDelete={() => Delete(worker.id)}
                />
            ))}
        </div>
    );
});

export default ShiftList;
