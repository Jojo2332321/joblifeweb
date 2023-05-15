import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {
    createCompanys,
    createWorker,
    fetchCompanyType,
    fetchWorker,
    fetchWorkPermit,
    fetchWorkStatus
} from "../http/ShiftsAPI";
import {Context} from "../index";
import {observe} from "mobx";
import {observer} from "mobx-react-lite";

const CreateWorkers = observer(({show, onHide, setCount}) => {
    const {shifts}=useContext(Context)
    useEffect(()=>{
        fetchWorkPermit().then(data =>shifts.setWorkerPermir(data))
        fetchWorkStatus().then(data =>shifts.setWorkerStatus(data))
    },[])

    const [firstname, setFirstname] = useState('')
    const [surname,setSurname] = useState('')
    const [number, setNumber] = useState('')
    const [age, setAge] = useState('')
    const [citizenship , setCitizenship] = useState('')
    const [workStatus, setWorkStatus ] = useState('')
    const [workPermit,setWorkPermit] = useState('')



    const addWorker = () =>{
        if (!firstname || !surname || !workPermit || !number || !age || !citizenship || !workStatus) {
            alert("All fields must be filled in");
            return;
        }

        const formData = new FormData()
            formData.append('firstname', firstname)
            formData.append('surname', surname,)
            formData.append('workPermitId', workPermit,)
            formData.append('number', number,)
            formData.append('age', age,)
            formData.append('citizenship', citizenship,)
            formData.append('workStatusId', workStatus)
            formData.append('userid', localStorage.getItem('userId'))
        createWorker(formData).then(data =>{
                setFirstname('')
                setSurname ('')
                setWorkPermit ('')
                setNumber ('')
                setAge ('')
                setCitizenship ('')
                setWorkStatus ('')
                onHide()
                setCount(prevCount => prevCount + 1);
            fetchWorker().then(data => shifts.setWorker(data));
        })
    }

    const ChangeWorkStatus = (event) => {
        setWorkStatus(event.target.value);
    };
    const ChangeWorkPermit = (event) => {
        setWorkPermit(event.target.value);
    };

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

                    <Form.Select className="mt-2" aria-label="Default select example" value={workPermit} onChange={ChangeWorkPermit}>
                        <option>Select Permit</option>
                        {shifts.workerPermit.map(workerPermit =>
                            <option key={workerPermit.id} value={workerPermit.id}>{workerPermit.name}</option>
                        )}
                    </Form.Select>
                    <Form.Select className="mt-2" aria-label="Default select example" value={workStatus} onChange={ChangeWorkStatus}>
                        <option>Select Status</option>
                        {shifts.workerStatus.map(workerStatus =>
                            <option key={workerStatus.id} value={workerStatus.id}>{workerStatus.name}</option>
                        )}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addWorker}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateWorkers;