import React, {useState} from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";

import WorkersList from "../components/WorkersList";
import CreateWorkers from "../modals/CreateWorkers";

const Workers = ({show, onHide}) => {
    const [workersModal, setWorkersModal] = useState(false)
    return (
        <div>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                    <WorkersList/>
                </Col>
                <Col md={1}>
                    <Row>
                    <Button className="mt-2" variant="outline-primary" >Search</Button>
                    <Button className="mt-2" variant="outline-primary" onClick={()=> setWorkersModal(true)}>Add Worker</Button>
                    </Row>
                    <CreateWorkers show = {workersModal} onHide={()=>setWorkersModal(false)}/>
                </Col>
            </Row>
        </div>
    );
};

export default Workers;