import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createCompanys, createPositions} from "../http/ShiftsAPI";

const CreatePositio = ({show, onHide}) => {
    const [name,setName] = useState('')
    const addPositions = () =>{
        if (!name.trim()) {
            alert("Position name cannot be empty");
            return;
        }
        createPositions(({name:name, userid: localStorage.getItem('userId')})).then(data =>{
            setName('')
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
                    Add new position
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter position name"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addPositions}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePositio;