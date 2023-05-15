import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createWorkHourTemplates} from "../http/ShiftsAPI";

const CreateWorkHourTemplates = ({show, onHide}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const addTemplate = () => {
        if (!name || !description || !startTime || !endTime) {
            alert("All fields must be filled in");
            return;
        }
        createWorkHourTemplates({name, description, startTime, endTime, userid: localStorage.getItem('userId')}).then(data => {
            setName('')
            setDescription('')
            setStartTime('')
            setEndTime('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new work hour template
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter template name"}
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={"Enter description"}
                        as="textarea"
                        rows={3}
                    />
                    <Form.Control
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        placeholder={"Enter start time"}
                        type="time"
                    />
                    <Form.Control
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        placeholder={"Enter end time"}
                        type="time"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addTemplate}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWorkHourTemplates;
