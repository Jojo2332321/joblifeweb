import React, { useContext, useEffect } from 'react';
import { Context } from "../index";
import { deleteCompanyType, fetchCompanyType } from "../http/ShiftsAPI";
import { Button, Modal, Table } from "react-bootstrap";

const CompanyTypesList = ({ show, onHide }) => {
    const { shifts } = useContext(Context);
    const userId = parseInt(localStorage.getItem('userId'));

    useEffect(() => {
        fetchCompanyType().then(data => shifts.setCompanyType(data));
    }, []);

    const deleteType = async (id) => {
        try {
            await deleteCompanyType(id);
            const updatedCompanyTypes = shifts.companyType.filter(type => type.id !== id);
            shifts.setCompanyType(updatedCompanyTypes);
        } catch (error) {
            console.error('Error deleting company type:', error);
        }
    };

    const filteredCompanyTypes = shifts.companyType.filter(companyType => companyType.userid === userId);

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
                    Company Types
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCompanyTypes.map(companyType =>
                        <tr key={companyType.id}>
                            <td>{companyType.name}</td>
                            <td className="text-center">
                                <Button variant="danger" onClick={() => deleteType(companyType.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompanyTypesList;
