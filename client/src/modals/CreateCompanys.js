import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createCompanys, fetchCompanys, fetchCompanyType} from "../http/ShiftsAPI";
import {Context} from "../index";

const CreateCompanys = ({show, onHide}) => {
    const {shifts}=useContext(Context)
    const [name, setName]= useState('')
    const [type, setType]= useState('')
    const [selectedType, setSelectedType] = useState('');
    const addCompanys = () =>{
        const formData = new FormData()
            formData.append('name',name)
            formData.append('companyTypeId',selectedType)
            formData.append('userid', localStorage.getItem('userId'))

        createCompanys(formData).then(data =>{
            setSelectedType('')
            setName('')
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