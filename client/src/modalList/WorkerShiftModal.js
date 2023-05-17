import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Table} from "react-bootstrap";
import {Context} from "../index";
import {
    deleteShift,
    fetchCompanys,
    fetchPositions,
    fetchShift,
    fetchWorker,
    fetchWorkHourTemplates
} from "../http/ShiftsAPI";
import data from "bootstrap/js/src/dom/data";
import {observer} from "mobx-react-lite";
import DatePicker from "react-datepicker";
import CreateShifts from "../modals/CreateShifts";
import CreateCompanys from "../modals/CreateCompanys";

const WorkerShiftModal = observer(({show, onHide, worker}) => {
    const {shifts} = useContext(Context);
    const [createShift, setCreateShift] = useState(false)

    useEffect(() => {
        fetchWorker().then(data => shifts.setWorker(data));
        fetchShift().then(data => shifts.setShift(data));
        fetchPositions().then(data => shifts.setPositions(data))
        fetchCompanys().then(data => shifts.setCompanys(data))
        fetchWorkHourTemplates().then(data => shifts.setWorkHourTemplates(data))
    }, []);

    const filteredShifts = worker
        ? shifts.shift.filter(
            (shift) =>
                shift.workerId === worker.id
        )
        : shifts.shift;

    const Delete = async (shiftId) => {
        try {
            await deleteShift(shiftId);
            const updatedShifts = shifts.shift.filter(shift => shift.id !== shiftId);
            shifts.setShift(updatedShifts);
        } catch (error) {
            console.error('Error deleting shift:', error);
        }
    };




    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Worker Shift {worker?.firstname} {worker?.surname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className="mt-2" striped bordered hover>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Od</th>
                        <th>Do</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredShifts.map(shift => {
                        const position = shifts.positions && shifts.positions.find(position => position.id === shift.positionId);
                        const workHourTemplates = shifts.workHourTemplates && shifts.workHourTemplates.find(workHourTemplates => workHourTemplates.id === shift.workHourTemplateId);
                        const company = shifts.companys && shifts.companys.find(company => company.id === shift.companyId);

                        return (
                            <tr key={shift.id}>
                                <td>{shift.startDate}</td>
                                <td>{company && company.name}</td>
                                <td>{position && position.name ? position.name : ""}</td>
                                <td>{workHourTemplates && workHourTemplates.startTime}</td>
                                <td>{workHourTemplates && workHourTemplates.endTime}</td>
                                <td className="text-center">
                                    <Button variant="outline-danger" onClick={() => Delete(shift.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>

                <Button onClick={()=>setCreateShift(true)}>Add a shift</Button>{' '}
                <Button onClick={onHide}>Close</Button>

                {/*<CreateCompanys show={createShift} onHide={()=> setCreateShift(false)}/>*/}
            </Modal.Footer>
        </Modal>
    );
});

export default WorkerShiftModal;