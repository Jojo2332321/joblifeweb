import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Context} from "../index";
import {Button, Table} from "react-bootstrap";
import {fetchCompanyType, fetchWorker,deleteWorker} from "../http/ShiftsAPI";

const WorkersList = observer(() => {
    const {shifts}=useContext(Context)

    useEffect(()=>{
        fetchWorker().then(data =>shifts.setWorker(data))
    },[])

    const Delete = async (id) => {
        try {
            await deleteWorker(id);
            const updatedWorkers = shifts.worker.filter(worker => worker.id !== id);
            shifts.setWorker(updatedWorkers);
        } catch (error) {
            console.error('Error deleting worker:', error);
        }
    };

    return (
        <Table className="mt-2" striped bordered hover >
            <thead>
            <tr>
                <th>firstname</th>
                <th>surname</th>
                <th>age</th>
                <th>citizenship</th>
                <th>number</th>
                <th>work_permit</th>
                <th>work_status</th>

            </tr>
            </thead>
            <tbody>
            {shifts.worker.map(worker =>
                <tr key={worker.id}>
                    <td>{worker.firstname}</td>
                    <td>{worker.surname}</td>
                    <td>{worker.age}</td>
                    <td>{worker.citizenship}</td>
                    <td>{worker.number}</td>
                    <td>{worker.work_permit}</td>
                    <td>{worker.work_status}</td>
                    <td className="text-center"> <Button variant="outline-danger" onClick={() => Delete(worker.id)}>Delete</Button>
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
});

export default WorkersList;