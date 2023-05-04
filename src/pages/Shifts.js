import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CompanysBar from "../components/CompanysBar";
import WorkersListInShifts from "../components/WorkersListInShifts";
import ShiftsFiltr from "../components/ShiftsFiltr";

import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCompanys} from "../http/ShiftsAPI";
import data from "bootstrap/js/src/dom/data";
import ShiftList from "../components/ShiftList";
import Calendar from "../components/Calendar";
import CreateShifts from "../modals/CreateShifts";



const Shifts = observer(() => {
    const {shifts} = useContext(Context)

    const [createShiftModal, setCteateShiftModal] = useState(false);
    const [selectData, setSelectData] = useState('');
    useEffect(()=>{
        fetchCompanys().then(data =>shifts.setCompanys(data))
    },[])

    const handleDateChange = (date) => {
        setSelectData(date)
    };

    return (

        <Container>


            <Row>
                <Col md={2}>
                    <CompanysBar/>
                </Col>

                <Col md={8}>
                    <ShiftList/>
                </Col>

                <Col md={2}>
                    <Row className="mt-2">
                    <Calendar onDateChange={handleDateChange} />
                    </Row>
                    <hr/>
                    <Row>
                    <Button className="mt-2" variant="outline-primary" onClick={()=> setCteateShiftModal(true)}>Add a shift</Button>
                    <Button className="mt-2" variant="outline-primary">Add sfifts</Button>
                    <CreateShifts show={createShiftModal} onHide={()=> setCteateShiftModal(false)}/>
                        <hr/>
                        <Button className="mt-2" variant="outline-primary">Shift export</Button>
                        <Button className="mt-2" variant="outline-primary">Shift import</Button>
                    </Row>

                </Col>
            </Row>
        </Container>
    );
});

export default Shifts;
