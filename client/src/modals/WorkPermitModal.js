import React, { useState } from 'react';
import { Button, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import {createWorkPermit, createWorkStatus} from "../http/ShiftsAPI";


const CreateModal = ({ show, onHide }) => {
    const [workPermitName, setWorkPermitName] = useState('');

    const addWorkPermit = () => {
        if (!workPermitName) {
            alert("Please enter a work permit name");
            return;
        }
        const formData = new FormData();
        formData.append('name', workPermitName);
        formData.append('userid',localStorage.getItem('userId'));
        createWorkPermit(formData).then(() => {
            setWorkPermitName('');
            onHide();
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Work Permit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={workPermitName}
                        onChange={(e) => setWorkPermitName(e.target.value)}
                        placeholder="Enter permit name"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={addWorkPermit}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;