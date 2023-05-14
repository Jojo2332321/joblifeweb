import React, {useContext, useEffect} from 'react';
import {Card, Button, Row, Form, Col} from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import {fetchCompanys, fetchPositions, fetchWorker, fetchWorkHourTemplates} from "../http/ShiftsAPI";
import {Context} from "../index";

const WorkerCard = ({firstname, surname, timeStart,timeEnd,position, data}) => {
    const {shifts}=useContext(Context)
    useEffect(()=>{
        fetchPositions().then(data =>shifts.setPositions(data));
        fetchWorker().then(data =>shifts.setWorker(data))
        fetchWorkHourTemplates().then(data =>shifts.setWorkHourTemplates(data))
        fetchCompanys().then(data => shifts.setCompanys(data))
    },[])

    return (
        <Card className="mt-2">
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <Row>
                            <Card.Title>{firstname}{surname}</Card.Title>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <Form>
                            {timeStart}
                            <br />
                            {timeEnd}
                        </Form>
                    </Col>
                    <Col md={3}>
                        {position}
                    </Col>
                    <Col md={2}>
                        <Form>
                            <Button variant="outline-danger" >Delete</Button>
                        </Form>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default WorkerCard;
