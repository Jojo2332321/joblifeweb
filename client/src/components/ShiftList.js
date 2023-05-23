import React, { useContext, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { deleteShift, fetchPositions, fetchShift, fetchWorker, fetchWorkHourTemplates } from "../http/ShiftsAPI";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { reaction } from "mobx";

const ShiftList = observer(({ date, company, onShiftDeleted }) => {
    const { shifts } = useContext(Context);

    useEffect(() => {
        fetchWorker().then(data => shifts.setWorker(data));
        fetchShift().then(data => shifts.setShift(data));
        fetchPositions().then(data => shifts.setPositions(data));
        fetchWorkHourTemplates().then(data => shifts.setWorkHourTemplates(data));

        const disposer = reaction(
            () => shifts.shift,
            () => {
            }
        );

        return () => disposer();
    }, []);

    const Delete = async (shiftId) => {
        try {
            await deleteShift(shiftId);
            onShiftDeleted();
        } catch (error) {
            console.error('Error deleting shift:', error);
        }
    };

    const isoString = new Date(date);
    isoString.setDate(isoString.getDate() - 1);
    const filteredShifts = company && date
        ? shifts.shift.filter(
            (shift) =>
                new Date(shift.startDate).toDateString() === isoString.toDateString() && shift.companyId === company
        )
        : shifts.shift;

    return (
        <div>
            {filteredShifts.map(shift => {
                const worker = shifts.worker && shifts.worker.find(worker => worker.id === shift.workerId);
                const position = shifts.positions && shifts.positions.find(position => position.id === shift.positionId);
                const workHourTemplates = shifts.workHourTemplates && shifts.workHourTemplates.find(workHourTemplates => workHourTemplates.id === shift.workHourTemplateId);

                return (
                    <Card className="mt-2" key={shift.id}>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Row>
                                        <Card.Title>{worker ? `${worker.firstname} ${worker.surname}` : ""}</Card.Title>
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <Form>
                                        {workHourTemplates && workHourTemplates.startTime}
                                        <br/>
                                        {workHourTemplates && workHourTemplates.endTime}
                                    </Form>
                                </Col>
                                <Col md={3}>
                                    {position && position.name ? position.name : ""}
                                </Col>
                                <Col md={2}>
                                    <Form>
                                        <Button variant="outline-danger" onClick={() => Delete(shift.id)}>Delete</Button>
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
