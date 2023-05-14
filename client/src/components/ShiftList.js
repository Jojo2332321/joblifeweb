import React, {useContext, useEffect} from 'react';
import WorkerCard from './WorkerCard';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {
    deleteShift,
    deleteWorker,
    fetchPositions,
    fetchShift,
    fetchWorker,
    fetchWorkHourTemplates
} from "../http/ShiftsAPI";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";
const ShiftList = observer(({date}) => {
    const {shifts}=useContext(Context)
    useEffect(()=>{
        fetchWorker().then(data =>shifts.setWorker(data))
        fetchShift().then(data=>shifts.setShift(data))
        fetchPositions().then(data=>shifts.setPositions(data))
        fetchWorkHourTemplates().then(data=>shifts.setWorkHourTemplates(data))
    },[])



    const Delete = async (shiftId) => {
        try {
            await deleteShift(shiftId);
            shifts.setShifts(shifts.shifts.filter(shift => shift.id !== shiftId));
        } catch (error) {
            console.error('Error deleting shift:', error);
        }
    };

    return (
        <div>
            {shifts.shift.map(shift => {
                const worker = shifts.worker && shifts.worker.find(worker => worker.id === shift.workerId);
                const position = shifts.positions && shifts.positions.find(position => position.id === shift.positionId);
                const workHourTemplates = shifts.workHourTemplates && shifts.workHourTemplates.find(workHourTemplates => workHourTemplates.id === shift.workHourTemplateId);

                return (
                    <Card className="mt-2" key={shift.id}>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Row>
                                        <Card.Title>{worker ? worker.firstname : ""}{worker ? worker.surname : ""}</Card.Title>
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <Form>
                                        {workHourTemplates && workHourTemplates.startTime}
                                        <br />
                                        {workHourTemplates && workHourTemplates.endTime}
                                    </Form>
                                </Col>
                                <Col md={3}>
                                    {position && position.name ? position.name : ""}
                                </Col>
                                <Col md={2}>
                                    <Form>
                                        <Button variant="outline-danger" onClick={() => Delete(shift.id)} >Delete</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
});

export default ShiftList;
