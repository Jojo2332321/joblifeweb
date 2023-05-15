import React, {useState} from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";

import WorkersList from "../components/WorkersList";
import CreateWorkers from "../modals/CreateWorkers";
import {observe} from "mobx";
import {observer} from "mobx-react-lite";

const Workers = observer(({show, onHide}) => {
    const [workersModal, setWorkersModal] = useState(false)
    const [count, setCount] = useState(0)

    return (
        <div>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                    <WorkersList count={count} />
                </Col>
                <Col md={1}>
                    <Row>
                    <Button className="mt-2" variant="outline-primary" >Search</Button>
                    <Button className="mt-2" variant="outline-primary" onClick={()=> setWorkersModal(true)}>Add Worker</Button>
                    </Row>
                    <CreateWorkers show = {workersModal} onHide={()=>setWorkersModal(false)} setCount={setCount}/>
                </Col>
            </Row>
        </div>
    );
});

export default Workers;