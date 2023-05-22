import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../index";
import {
    deleteShift,
    deleteWorker,
    fetchCompanys,
    fetchCompanyType,
    fetchShift,
    fetchWorker,
    updateWorker
} from "../http/ShiftsAPI";

const WorkerInfoModal = ({show, onHide, worker}) => {
    const {shifts}=useContext(Context)

    const [firstname, setFirstname] = useState(worker ? worker.firstname : '');
    const [surname, setSurname] = useState(worker ? worker.surname : '');
    const [age, setAge] = useState(worker ? worker.age : '');
    const [citizenship, setCitizenship] = useState(worker ? worker.citizenship : '');
    const [number, setNumber] = useState(worker ? worker.number : '');

    useEffect(()=>{
        fetchWorker().then(data =>shifts.setWorker(data))

    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();
        let updatedWorkerData = {};
        if (worker.firstname !== firstname) updatedWorkerData.firstname = firstname;
        if (worker.surname !== surname) updatedWorkerData.surname = surname;
        if (worker.age !== age) updatedWorkerData.age = age;
        if (worker.citizenship !== citizenship) updatedWorkerData.citizenship = citizenship;
        if (worker.number !== number) updatedWorkerData.number = number;
        try {

            await updateWorker(worker.id, updatedWorkerData);
            onHide();
            fetchWorker().then(data => shifts.setWorker(data));
        } catch (error) {
            console.error('Error updating worker:', error);
        }
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {worker ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Worker Info
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>First name: {worker.firstname}</Form.Label>
                                <Form.Control type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Surname: {worker.surname}</Form.Label>
                                <Form.Control type="text" value={surname} onChange={e => setSurname(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age: {worker.age}</Form.Label>
                                <Form.Control type="number" value={age} onChange={e => setAge(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Citizenship: {worker.citizenship}</Form.Label>
                                <Form.Control type="text" value={citizenship} onChange={e => setCitizenship(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Number: {worker.number}</Form.Label>
                                <Form.Control type="text" value={number} onChange={e => setNumber(e.target.value)} />
                            </Form.Group>
                            <Button className="mt-2 " type="submit">Update</Button>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  onClick={onHide}>Close</Button>

                    </Modal.Footer>
                </>
            ) : null}
        </Modal>
    );
};

export default WorkerInfoModal;