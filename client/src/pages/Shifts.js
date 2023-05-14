import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CompanysBar from "../components/CompanysBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCompanys} from "../http/ShiftsAPI";
import data from "bootstrap/js/src/dom/data";
import ShiftList from "../components/ShiftList";
import Calendar from "../components/Calendar";
import CreateShifts from "../modals/CreateShifts";
import DatePicker from "react-datepicker";



const Shifts = () => {
    const {shifts} = useContext(Context)
    const {user} = useContext(Context)

    const [createShiftModal, setCteateShiftModal] = useState(false);
    const [selectData, setSelectData] = useState(new Date());
    useEffect(()=>{
        fetchCompanys().then(data =>shifts.setCompanys(data))
    },[])

    useEffect(() => {
    }, [selectData]);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectData(date);
    };
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const handleCompanySelected = (companyId) => {
        setSelectedCompanyId(companyId);
    };


    return (

        <Container>
            <Row>
                <Col md={2}>
                    <CompanysBar onCompanySelected={handleCompanySelected}/>
                </Col>

                <Col md={8}>
                    <ShiftList date={selectedDate}/>
                </Col>

                <Col md={2}>
                    <Row className="mt-2">

                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select a date"
                            />

                    </Row>
                    <hr/>
                    <Row>
                    <Button className="mt-2" variant="outline-primary" onClick={()=> setCteateShiftModal(true)}>Add a shift</Button>
                    <Button className="mt-2" variant="outline-primary">Add sfifts</Button>
                    <CreateShifts
                        show={createShiftModal}
                        onHide={()=> setCteateShiftModal(false)}
                        date={selectData}
                        company={selectedCompanyId}
                    />
                        <hr/>
                        <Button className="mt-2" variant="outline-primary">Shift export</Button>
                        <Button className="mt-2" variant="outline-primary" >Shift import</Button>
                    </Row>

                </Col>
            </Row>

        </Container>

    );
};

export default Shifts;
