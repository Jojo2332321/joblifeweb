import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Col, Row} from "react-bootstrap";
import CreateCompanys from "../modals/CreateCompanys";
import CreatePositio from "../modals/CreatePositio";
import CreateComapanyTyp from "../modals/CreateComapanyTyp";
import CreateWorkHourTemplates from "../modals/CreateWorkHourTemplates";
import WorkPermitModal from "../modals/WorkPermitModal";
import CreateWorkStatusModal from "../modals/CreateWorkStatusModal";

const ButtonBarCreateInSetting = () => {
    const [companysModal, setCompanysModal] = useState(false)
    const [positionModal, setPositionModal] = useState(false)
    const [companyTypeModal, setCompanyTypeModal] = useState(false)
    const [timeModal, setTimeModal] = useState(false)
    const [workPermit, setWorkPermit] = useState(false)
    const [workStatus, setWorkStatus] = useState(false)


    return (
        <Row>
            <Col xs={12} className="mt-2 d-flex flex-column">
                <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={() => setCompanyTypeModal(true)}>Add
                    company type</Button>
                <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={() => setCompanysModal(true)}>Add
                    Company</Button>
                <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={() => setPositionModal(true)}>Add
                    Position</Button>
                <Button className="mt-2 p-2 w-auto" variant={"outline-dark"}
                        onClick={() => setTimeModal(true)}>Time</Button>
                <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={() => setWorkPermit(true)}>Worker
                    Permit</Button>
                <Button className="mt-2 p-2 w-auto" variant={"outline-dark"} onClick={() => setWorkStatus(true)}>Worker
                    Status</Button>
            </Col>
            <CreateCompanys show={companysModal} onHide={() => setCompanysModal(false)}/>
            <CreatePositio show={positionModal} onHide={() => setPositionModal(false)}/>
            <CreateComapanyTyp show={companyTypeModal} onHide={() => setCompanyTypeModal(false)}/>
            <CreateWorkHourTemplates show={timeModal} onHide={() => setTimeModal(false)}/>
            <WorkPermitModal show={workPermit} onHide={() => setWorkPermit(false)}/>
            <CreateWorkStatusModal show={workStatus} onHide={() => setWorkStatus(false)}/>

        </Row>
    );
};

export default ButtonBarCreateInSetting;