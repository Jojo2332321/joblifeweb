import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createCompanys, fetchCompanys, fetchCompanyType} from "../http/ShiftsAPI";
import {Context} from "../index";

const CreateCompanys = ({show, onHide}) => {
    const {shifts}=useContext(Context)
    const [name, setName]= useState('')
    const [type, setType]= useState('')
    const [selectedType, setSelectedType] = useState('');
    const addCompanys = () =>{
        createCompanys(({name:name, type:selectedType})).then(data =>{
            setName('')
            setType('')
            onHide()
        })
    }
    useEffect(()=>{
        fetchCompanyType().then(data =>shifts.setCompanyType(data))
    },[])

    const Change = (event) => {
        setSelectedType(event.target.value);
        console.log(selectedType)
    };

    return (

        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new Companys
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter companys name"}
                    />

                </Form>
                    <Form.Select className="mt-2" aria-label="Default select example" value={selectedType} onChange={Change}>
                        <option>Select type</option>
                        {shifts.companyType.map(companyType =>
                        <option key={companyType.id} value={companyType.id}>{companyType.name}</option>
                            )}
                    </Form.Select>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addCompanys}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCompanys;