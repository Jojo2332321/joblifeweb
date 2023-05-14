import React, {useContext, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Context} from "../index";
import CompanyTypesList from "../modalList/companyTypesList";
import CompanyList from "../modalList/companyList";

const ButtonBarListInSetting = () => {
    const [companysModal, setCompanysModal] = useState(false)
    const [positionModal, setPositionModal] = useState(false)
    const [companyTypeModal, setCompanyTypeModal] = useState(false)
    const [timeModal, setTimeModal] = useState(false)
    const [workPermit, setWorkPermit] = useState(false)
    const [workStatus, setWorkStatus] = useState(false)

    return (
        <Row>
            <Col xs={12} className="mt-2 d-flex flex-column">
                <Button className="mt-2 p-2 w-auto" variant={"dark"} onClick={() => setCompanyTypeModal(true)}>company types list</Button>
                <Button className="mt-2 p-2 w-auto" variant={"dark"} onClick={() => setCompanysModal(true)}>list of companies</Button>
                <Button className="mt-2 p-2 w-auto" variant={"dark"}>position list</Button>
                <Button className="mt-2 p-2 w-auto" variant={"dark"}>Time list</Button>
                <Button className="mt-2 p-2 w-auto" variant={"dark"}>Worker Permit list</Button>
                <Button className="mt-2 p-2 w-auto" variant={"dark"}>Worker Status List</Button>
            </Col>
            <CompanyTypesList show={companyTypeModal} onHide={() => setCompanyTypeModal(false)}/>
            <CompanyList show={companysModal} onHide={() => setCompanysModal(false)}/>
        </Row>
    );
};

export default ButtonBarListInSetting;