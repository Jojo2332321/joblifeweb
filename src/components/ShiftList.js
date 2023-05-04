import React, {useContext} from 'react';
import WorkerCard from './WorkerCard';
import {Context} from "../index";

import {observer} from "mobx-react-lite";

const ShiftList = observer(({ workers }) => {
    const {shifts}=useContext(Context)
    const handleDelete = (workerId) => {
        // логика удаления работника
    };

    return (
        <div>
            {shifts.worker.map(worker => (
                <WorkerCard
                    key={worker.id}
                    firstName={worker.firstname}
                    surname ={worker.surname}
                    onDelete={() => handleDelete(worker.id)}
                />
            ))}
        </div>
    );
});

export default ShiftList;
