import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Context} from "../index";
import {Button, Table} from "react-bootstrap";
import {fetchCompanyType, fetchWorker, deleteWorker, fetchWorkPermit, fetchWorkStatus} from "../http/ShiftsAPI";

const WorkersList = observer(() => {
    const {shifts}=useContext(Context)

    useEffect(()=>{
        fetchWorker().then(data =>shifts.setWorker(data))
        fetchWorkPermit().then(data =>shifts.setWorkerPermirI(data))
        fetchWorkStatus().then(data =>shifts.setWorkerStatus(data))
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
            {shifts.worker.map((worker) => {
                const workPermit = shifts.workerPermit.find((permit) => permit.id === worker.workPermitId);
                const workStatus = shifts.workerStatus.find((status) => status.id === worker.workStatusId);

                return (
                    <tr key={worker.id}>
                        <td>{worker.firstname}</td>
                        <td>{worker.surname}</td>
                        <td>{worker.age}</td>
                        <td>{worker.citizenship}</td>
                        <td>{worker.number}</td>
                        <td>{workPermit ? workPermit.name : "N/A"}</td>
                        <td>{workStatus ? workStatus.name : "N/A"}</td>
                        <td className="text-center">
                            <Button variant="outline-danger" onClick={() => Delete(worker.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </Table>
    );
});

export default WorkersList;