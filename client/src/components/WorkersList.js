import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {Button, Form, Table} from "react-bootstrap";
import {fetchCompanyType, fetchWorker, deleteWorker, fetchWorkPermit, fetchWorkStatus} from "../http/ShiftsAPI";
import CreateWorkers from "../modals/CreateWorkers";
import {reaction} from "mobx";
import WorkerInfoModal from "../modalList/WorkerInfoModal";
import WorkerShiftModal from "../modalList/WorkerShiftModal";

const WorkersList = observer(({count}) => {
    const {shifts}=useContext(Context)
    const [searchTerm, setSearchTerm] = useState('');
    const [workerInfo, setWorkerInfo] = useState(false)
    const [selectedWorker, setSelectedWorker] = useState(null)
    const [workerShift, setWorkerShift] = useState(false)

    useEffect(()=>{
        fetchWorker().then(data =>shifts.setWorker(data))
        fetchWorkPermit().then(data =>shifts.setWorkerPermir(data))
        fetchWorkStatus().then(data =>shifts.setWorkerStatus(data))
        const disposer = reaction(
            () => shifts.worker,
            () => {

            }
        );
        return () => disposer();
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

    const userId = parseInt(localStorage.getItem('userId'));
    /*const filteredWorkers = shifts.worker.filter(worker => worker.userid === userId);*/

    const filteredWorkers = shifts.worker.filter(worker =>
        worker.userid === userId &&
        (worker.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.surname.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const modalForm = (worker)=>{
        setSelectedWorker(worker)
        setWorkerShift(true)
    }

    return (
        <>
            <Form className="mt-2">
                <Form.Control
                    placeholder="Hledani"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form>

            <Table className="mt-2" striped bordered hover>
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
                {filteredWorkers.map((worker) => {
                    const workPermit = shifts.workerPermit.find((permit) => permit.id === worker.workPermitId);
                    const workStatus = shifts.workerStatus.find((status) => status.id === worker.workStatusId);

                    return (
                        <tr onDoubleClick={() =>{setSelectedWorker(worker); setWorkerInfo(true); console.log(selectedWorker)}} key={worker.id}>
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
                            <td className="text-center">
                                <Button variant="outline-dark" onClick={()=>modalForm(worker)}>
                                    Shift
                                </Button>


                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            <WorkerInfoModal show={workerInfo} onHide={() => {setWorkerInfo(false); setSelectedWorker(null);}} worker={setSelectedWorker}/>
            <WorkerShiftModal show={workerShift} onHide={() => setWorkerShift(false)} worker={selectedWorker}/>
        </>
    );
})

export default WorkersList;

localStorage.getItem('userId')