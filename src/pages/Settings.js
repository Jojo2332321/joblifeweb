import React, {useContext, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CreateCompanys from "../modals/CreateCompanys";
import CreatePositio from "../modals/CreatePositio";
import CreateComapanyTyp from "../modals/CreateComapanyTyp";

import {Context} from "../index";
import CreateWorkHourTemplates from "../modals/CreateWorkHourTemplates";
import WorkPermitModal from "../modals/WorkPermitModal";

const Settings = () => {
    const {user} = useContext(Context)

    const [companysModal, setCompanysModal] = useState(false)
    const [positionModal, setPositionModal] = useState(false)
    const [companyTypeModal, setCompanyTypeModal] = useState(false)
    const [timeModal, setTimeModal] = useState(false)
    const [workPermit, setWorkPermit] = useState(false)

    const userId = user.userId

    return (
        <Container className>
            <Row>
                <Col className="d-flex flex-column">
                </Col>
                <Col className="d-flex flex-column">
                    <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={()=> setCompanyTypeModal(true)}>Add company type</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={()=> setCompanysModal(true)}>Add Company</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={()=> setPositionModal(true)}>Add Position</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={()=> setTimeModal(true)}>Time</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={()=> setWorkPermit(true)}>Worker Options</Button>

                    <CreateCompanys show={companysModal} onHide={()=> setCompanysModal(false)}/>
                    <CreatePositio show={positionModal} onHide={()=> setPositionModal(false)}/>
                    <CreateComapanyTyp show={companyTypeModal} onHide={()=> setCompanyTypeModal(false)}/>
                    <CreateWorkHourTemplates show={timeModal} onHide={()=> setTimeModal(false)}/>
                    <WorkPermitModal show={workPermit} onHide={() => setWorkPermit(false)}/>
                </Col>
                <Col className="d-flex flex-column">
                    <Button className="mt-2 p-2 w-auto" variant={"dark"}>company types list</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"dark"}>list of companies</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"dark"}>position list</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"dark"}>Time list</Button>
                    <Button className="mt-2 p-2 w-auto" variant={"dark"}>Worker Options list</Button>
                </Col>
                <Col className="d-flex flex-column">
                </Col>
        </Row>
        </Container>

    );
};

export default Settings;