import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {
    createShift,
    fetchCompanys,
    fetchPositions,
    fetchShift,
    fetchWorker,
    fetchWorkHourTemplates
} from "../http/ShiftsAPI";
import {Button, Form, Modal, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";

const CreateShiftInWorker = ({show, onHide, worker}) => {
    const {shifts} = useContext(Context)
    useEffect(() => {
        fetchPositions().then(data => shifts.setPositions(data));
        fetchWorkHourTemplates().then(data => shifts.setWorkHourTemplates(data))
        fetchCompanys().then(data => shifts.setCompanys(data))
    }, [])
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedShift, setSelectedShift] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectData, setSelectData] = useState(new Date());
    useEffect(() => {
    }, [selectData]);
    const handleDateChange = (date) => {
        setSelectData(date);
        console.log('выбрана дата')
        console.log(date)
        console.log('выбрана дата2')
        console.log(selectData)
    };

    const addShift = () => {
        if (!selectedPosition || !selectedShift || !selectedCompany) {
            alert("All fields must be filled in");
            return;
        }
        const shiftOnSelectedDate = shifts.shift.find((shift) =>
            new Date(shift.startDate).toDateString() === selectData.toDateString() &&
            shift.workerId === worker.id
        );

        if (shiftOnSelectedDate) {
            alert("The selected employee already has a shift on the selected date.");
            return;
        }
        const formData = new FormData()
        formData.append("workerId", worker.id);
        formData.append("positionId", selectedPosition);
        formData.append("workHourTemplateId", selectedShift);
        formData.append("startDate", selectData.toISOString().split('T')[0]);
        formData.append("companyId", selectedCompany)
        formData.append("userid", localStorage.getItem('userId'))

        createShift(formData).then(data => {
            setSelectedPosition("");
            setSelectedShift("");
            setSelectedCompany("");
            onHide();
            fetchShift().then(data => shifts.setShift(data));
        })

    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Shift for {worker.surname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group md={4} className="d-flex justify-content-end">
                    <DatePicker
                        selected={selectData}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Select a date"
                    />
                </Form.Group>

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

            </Modal.Body>
            <Modal.Footer>
                <Button  onClick={onHide}>Close</Button>
                <Button onClick={addShift}>Add Shift</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateShiftInWorker;