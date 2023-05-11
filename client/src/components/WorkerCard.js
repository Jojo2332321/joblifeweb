import React from 'react';
import {Card, Button, Row, Form, Col} from 'react-bootstrap';
import {observer} from "mobx-react-lite";

const WorkerCard = ({firstName,surname,onDelete}) => {
    return (
        <Card className="mt-2">

            <Card.Body>
                <Row>
                    <Col md={4}>
                        <Row>
                            <Card.Title>{firstName} {surname}</Card.Title>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <Form>
                            6:30
                            <br/>
                            18:00
                        </Form>
                    </Col>
                    <Col md={3}>
                        Position
                    </Col>
                    <Col md={2}>
                        <Form>
                            <Button variant="outline-danger" onClick={onDelete}>Delete</Button>
                        </Form>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default WorkerCard;
