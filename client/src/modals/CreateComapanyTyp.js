import React, {useState} from 'react';
import {createCompanyType} from "../http/ShiftsAPI";
import {Button, Form, Modal} from "react-bootstrap";

const CreateComapanyTyp = ({show, onHide}) => {
    const [name, setName]= useState('')
    const addCompanyType = () =>{

        createCompanyType(({name:name,userid: localStorage.getItem('userId')})).then(data =>{
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
                    Add new company type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter company type"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addCompanyType}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateComapanyTyp;