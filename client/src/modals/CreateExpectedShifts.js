import React, {useContext, useState} from 'react';
import {Col, Container, Modal, Row, Form, Button} from "react-bootstrap";
import {Context} from "../index";
import {createExpectedShift} from "../http/ShiftsAPI";
import data from "bootstrap/js/src/dom/data";

const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const CreateExpectedShifts = ({ show, onHide,worker }) => {

    const {shifts} = useContext(Context)
    const [month, setMonth] = useState('1');
    const [checkedDays, setCheckedDays] = useState({});
    const year = new Date().getFullYear(); // используем текущий год
    const days = getDaysInMonth(month, year);

    const handleChange = (event) => {
        setMonth(event.target.value);
    }

    const handleCheckboxChange = (day, event) => {
        setCheckedDays({
            ...checkedDays,
            [day]: event.target.checked
        });
    }

    const daysCheckboxes = [];
    for (let i = 1; i <= days; i++) {
        daysCheckboxes.push(
            <Form.Check
                type="checkbox"
                id={`default-checkbox${i}`}
                label={`Day ${i}`}
                key={i}
                onChange={(event) => handleCheckboxChange(i, event)}
            />
        );
    }

    const addExShifts = async () => {
        for (let day in checkedDays) {
            if (checkedDays[day]) {
                const date = new Date(year, month - 1, day); // месяцы начинаются с 0 в JavaScript
                const formData = new FormData();
                formData.append("Date", date.toISOString());
                formData.append("userid", localStorage.getItem('userId'));
                formData.append("workerId", worker.id);

                await createExpectedShift(formData);
            }
        }

        // reset state
        setCheckedDays({});
        setMonth('1');
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            centered
        >
            <Modal.Header>
                <Container>
                    <Row>
                        <Col>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Create Expected Shifts For {worker.surname}
                            </Modal.Title>
                        </Col>
                        <Col>
                            <select value={month} onChange={handleChange}>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </Col>
                    </Row>
                </Container>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {daysCheckboxes}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={addExShifts}>Save</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default CreateExpectedShifts;
