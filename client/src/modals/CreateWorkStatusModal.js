import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createWorkStatus } from '../http/ShiftsAPI';

const CreateWorkStatusModal = ({ show, onHide }) => {
    const [workStatusName, setWorkStatusName] = useState('');

    const addWorkStatus = () => {
        createWorkStatus({ name: workStatusName, userid: localStorage.getItem('userId') }).then(() => {
            setWorkStatusName('');
            onHide();
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Work Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={workStatusName}
                        onChange={(e) => setWorkStatusName(e.target.value)}
                        placeholder="Enter status name"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={addWorkStatus}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWorkStatusModal;