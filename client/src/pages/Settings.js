import React, {useContext, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CreateCompanys from "../modals/CreateCompanys";
import CreatePositio from "../modals/CreatePositio";
import CreateComapanyTyp from "../modals/CreateComapanyTyp";

import {Context} from "../index";
import CreateWorkHourTemplates from "../modals/CreateWorkHourTemplates";
import WorkPermitModal from "../modals/WorkPermitModal";
import CreateWorkStatusModal from "../modals/CreateWorkStatusModal";
import ButtonBarCreateInSetting from "../components/ButtonBarCreateInSetting";
import ButtonBarListInSetting from "../components/ButtonBarListInSetting";
import {observer} from "mobx-react-lite";

const Settings = observer(() => {


    return (
        <Container className>
            <Row>
                <Col className="d-flex flex-column">
                </Col>
                <Col className="d-flex flex-column">
                    <ButtonBarCreateInSetting/>
                </Col>
                <Col className="d-flex flex-column">
                    <ButtonBarListInSetting/>
                </Col>
                <Col className="d-flex flex-column">
                </Col>
        </Row>
        </Container>

    );
});

export default Settings;