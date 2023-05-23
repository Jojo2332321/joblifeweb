import React, { useContext, useEffect, useState } from 'react';
import { Modal, Table, Form, Button } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import {
    fetchCompanys,
    fetchExpectedShift,
    fetchPositions,
    fetchWorker,
    fetchWorkHourTemplates,
    createShift,
    fetchShift
} from "../http/ShiftsAPI";

const CreateAutoShfits = observer(({ show, onHide, date }) => {
    const { shifts } = useContext(Context);
    const [selectedShifts, setSelectedShifts] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedWorkHourTemplate, setSelectedWorkHourTemplate] = useState('');

    useEffect(() => {
        fetchPositions().then(data => shifts.setPositions(data));
        fetchWorker().then(data => shifts.setWorker(data));
        fetchWorkHourTemplates().then(data => shifts.setWorkHourTemplates(data));
        fetchCompanys().then(data => shifts.setCompanys(data));
        fetchExpectedShift().then(data => shifts.setExShifts(data));
    }, []);

    const selectedDate = new Date(date).toDateString();
    const isoString = date.toISOString();
    const updatedDate = new Date(isoString);
    updatedDate.setDate(updatedDate.getDate() - 1);

    const handleCheckboxChange = (workerId, event) => {
        if (event.target.checked) {
            setSelectedShifts(prevState => [...prevState, workerId]);
        } else {
            setSelectedShifts(prevState => prevState.filter(id => id !== workerId));
        }
    }

    const handleButtonClick = () => {
        selectedShifts.forEach(workerId => {
            const formData = new FormData();
            formData.append('workerId', workerId);
            formData.append('startDate', updatedDate);
            formData.append('companyId', selectedCompany);
            formData.append('positionId', selectedPosition);
            formData.append('workHourTemplateId', selectedWorkHourTemplate);
            formData.append('userid', localStorage.getItem('userId')); // Добавление userId в FormData

            createShift(formData).then(data => {
                onHide();
                fetchShift().then(data => shifts.setShift(data));
            });
        });
    };

    const userId = parseInt(localStorage.getItem('userId'));
    const filteredWorkers = shifts.worker.filter(worker =>
        worker.userid === userId &&
        shifts.exShifts.find(exShift =>
            new Date(exShift.Date).toDateString() === selectedDate && exShift.workerId === worker.id
        )
    );

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new shifts
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Worker</th>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Work Hour Template</th>
                        <th>Select</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredWorkers.map(worker =>
                        <tr key={worker.id}>
                            <td>{`${worker.firstname} ${worker.surname}`}</td>
                            <td>
                                <Form.Select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}>
                                    <option value="">Select a company</option> {/* Добавляем опцию по умолчанию */}
                                    {shifts.companys.map(company =>
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    )}
                                </Form.Select>
                            </td>
                            <td>
                                <Form.Select value={selectedPosition} onChange={e => setSelectedPosition(e.target.value)}>
                                    <option value="">Select a position</option> {/* Добавляем опцию по умолчанию */}
                                    {shifts.positions.map(position =>
                                        <option key={position.id} value={position.id}>{position.name}</option>
                                    )}
                                </Form.Select>
                            </td>
                            <td>
                                <Form.Select value={selectedWorkHourTemplate} onChange={e => setSelectedWorkHourTemplate(e.target.value)}>
                                    <option value="">Select a work hour template</option> {/* Добавляем опцию по умолчанию */}
                                    {shifts.workHourTemplates.map(template =>
                                        <option key={template.id} value={template.id}>{template.name}</option>
                                    )}
                                </Form.Select>
                            </td>
                            <td>
                                <Form.Check type="checkbox" onChange={(event) => handleCheckboxChange(worker.id, event)} />
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleButtonClick}>Add selected shifts</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateAutoShfits;
