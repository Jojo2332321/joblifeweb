import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createCompanys, createWorker} from "../http/ShiftsAPI";

const CreateWorkers = ({show, onHide}) => {
    const [firstname, setFirstname] = useState('')
    const [surname,setSurname] = useState('')
    const [workPermit,setWorkPermit] = useState('')
    const [number, setNumber] = useState('')
    const [age, setAge] = useState('')
    const [citizenship , setCitizenship] = useState('')
    const [workStatus, setWorkStatus ] = useState('')

    const addWorker = () =>{
        createWorker(({
            firstname:firstname,
            surname:surname,
            work_permit:workPermit,
            number:number,
            age:age,
            citizenship:citizenship,
            work_status:workStatus})).then(data =>{
                setFirstname('')
                setSurname ('')
                setWorkPermit ('')
                setNumber ('')
                setAge ('')
                setCitizenship ('')
                setWorkStatus ('')
                onHide()
        })
    }

    return (

        <Modal
            show={show}
            onHide={onHide}
            size='sm'
            centered>

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new worker
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        value={firstname}
                        onChange={e=> setFirstname(e.target.value)}
                        className="mt-2"
                        placeholder={"Enter worker's firstname"}/>
                    <Form.Control
                        value={surname}
                        onChange={e=>setSurname (e.target.value)}
                        className="mt-2"
                        placeholder={"Enter worker's surname"}/>
                    <Form.Control
                        value={workPermit}
                        onChange={e=> setWorkPermit(e.target.value)}
                        className="mt-2"
                        placeholder={"Enter worker's work_permit"}/>
                    <Form.Control
                        value={number}
                        onChange={e=> setNumber(e.target.value)}
                        className="mt-2"
                        placeholder={"Enter worker's number"}/>
                    <Form.Control
                        value={age}
                        onChange={e=> setAge(e.target.value)}
                        className="mt-2"
                        placeholder={"Enter worker's age"}/>
                    <Form.Control
                        value={citizenship}
                        onChange={e=> setCitizenship(e.target.value)}
                        className="mt-2"
                        placeholder={"Enter worker's citizenship"}/>
                    <Form.Control
                        value={workStatus}
                        onChange={e=> setWorkStatus(e.target.value)}
                        className="mt-2"
                        placeholder={"Enter worker's work_status"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addWorker}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWorkers;