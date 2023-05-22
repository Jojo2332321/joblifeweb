import React, {useContext, useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {
    createShift,
    fetchCompanys,
    fetchCompanyType,
    fetchPositions, fetchShift,
    fetchWorker,
    fetchWorkHourTemplates
} from "../http/ShiftsAPI";
import {Context} from "../index";
import Select from 'react-select';
import {format} from 'date-fns';
import data from "bootstrap/js/src/dom/data";


const CreateShifts = ({show, onHide, date, userid}) => {
    const {shifts} = useContext(Context)
    const isoString = date.toISOString();
    useEffect(() => {
        fetchPositions().then(data => shifts.setPositions(data));
        fetchWorker().then(data => shifts.setWorker(data))
        fetchWorkHourTemplates().then(data => shifts.setWorkHourTemplates(data))
        fetchCompanys().then(data => shifts.setCompanys(data))
    }, [])

    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedShift, setSelectedShift] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const addShift = () => {
        if (!selectedEmployee || !selectedPosition || !selectedShift || !selectedCompany) {
            alert("All fields must be filled in");
            return;
        }
        const employeeShifts = shifts.shift.filter(shift => shift.workerId === selectedEmployee.value);
        const shiftOnSelectedDate = employeeShifts.find(shift => new Date(shift.startDate).toDateString() === date.toDateString());

        if (shiftOnSelectedDate) {
            alert("The selected employee already has a shift on the selected date.");
        } else {
            const formData = new FormData()
            /*TODO*/
            formData.append("workerId", selectedEmployee.value);
            formData.append("positionId", selectedPosition);
            formData.append("workHourTemplateId", selectedShift);
            formData.append("startDate", isoString);
            formData.append("companyId", selectedCompany)
            formData.append("userid", localStorage.getItem('userId'))

            createShift(formData).then(data => {
                setSelectedEmployee("");
                setSelectedPosition("");
                setSelectedShift("");
                setSelectedCompany("");
                onHide();
                fetchShift().then(data => shifts.setShift(data));
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        /*        console.log(`Employee: ${selectedEmployee}, Position: ${selectedPosition}, Shift: ${selectedShift}`);*/
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Shift</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit}>

                    <Select
                        value={selectedEmployee}
                        onChange={(selectedOption) => setSelectedEmployee(selectedOption)}
                        options={shifts.worker
                            .filter(worker => {
                                const workerShifts = shifts.shift.filter(shift => shift.workerId === worker.id);
                                const shiftOnSelectedDate = workerShifts.find(shift => new Date(shift.startDate).toDateString() === date.toDateString());
                                return !shiftOnSelectedDate;
                            })
                            .map(worker => ({value: worker.id, label: `${worker.firstname} ${worker.surname}`}))
                        }
                    />

                    <Form.Group>
                        <Form.Label>Position:</Form.Label>
                        <Form.Select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                        >
                            <option value="">Select Position</option>
                            {shifts.positions.map(position =>
                                <option key={position.id} value={position.id}> {position.name}</option>)}

                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Company:</Form.Label>
                        <Form.Select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="">Select Company</option>
                            {shifts.companys.map(companys =>
                                <option key={companys.id} value={companys.id}> {companys.name}</option>)}

                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="shift">
                        <Form.Label>Shift:</Form.Label>
                        <Form.Select
                            value={selectedShift}
                            onChange={(e) => setSelectedShift(e.target.value)}
                        >
                            <option value="">Select Shift</option>
                            {shifts._workHourTemplates.map(workHourTemplate =>
                                <option key={workHourTemplate.id}
                                        value={workHourTemplate.id}> {workHourTemplate.name}</option>)}
                        </Form.Select>

                    </Form.Group>

                    <div className="d-flex justify-content-end mt-2">
                        <Button variant="primary" onClick={addShift}>
                            Add
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateShifts;
