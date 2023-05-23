import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {deleteCompany, fetchCompanys, fetchCompanyType} from "../http/ShiftsAPI";
import {Button, Modal, Table, Form} from "react-bootstrap";

const CompanyList = ({show, onHide}) => {
    const {shifts}=useContext(Context)

    useEffect(()=>{
        fetchCompanys().then(data =>shifts.setCompanys(data))
        fetchCompanyType().then(data =>shifts.setCompanyType(data))
    },[])

    const removeCompany  = async (id) => {
        try {
            await deleteCompany(id);
            const updatedCompanys = shifts.companys.filter(company => company.id !== id);
            shifts.setCompanys(updatedCompanys);
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Companies
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shifts.companys.map(company => {
                        const companyType = shifts.companyType.find(type => type.id === company.companyTypeId);

                        return (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{companyType ? companyType.name : "N/A"}</td>
                                <td className="text-center">
                                    <Button variant="danger" onClick={() => removeCompany (company.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompanyList;