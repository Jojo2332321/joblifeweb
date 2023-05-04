import React, { useState } from 'react';
import { Button, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import {createWorkPermit, createWorkStatus} from "../http/ShiftsAPI";


const CreateModal = ({ show, onHide }) => {
    const [workPermitName, setWorkPermitName] = useState('');
    const [workStatusName, setWorkStatusName] = useState('');

    const addWorkPermit = () => {
        createWorkPermit({ name: workPermitName }).then(() => {
            setWorkPermitName('');
            onHide();
        });
    };

    const addWorkStatus = () => {
        createWorkStatus({ name: workStatusName }).then(data => {
            setWorkStatusName('')
            onHide()
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="work-permit" id="uncontrolled-tab-example">
                    <Tab eventKey="work-permit" title="Work Permit">
                        <Form>
                            <Form.Control
                                value={workPermitName}
                                onChange={(e) => setWorkPermitName(e.target.value)}
                                placeholder="Enter permit name"
                            />
                        </Form>
                    </Tab>
                    <Tab eventKey="work-status" title="Work Status">
                        <Form>
                            <Form.Control
                                value={workStatusName}
                                onChange={(e) => setWorkStatusName(e.target.value)}
                                placeholder="Enter status name"
                            />
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={Tabs.defaultActiveKey === 'work-permit' ? addWorkPermit : addWorkStatus}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;