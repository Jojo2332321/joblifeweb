import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CompanysBar from "../components/CompanysBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCompanys, fetchShift} from "../http/ShiftsAPI";
import data from "bootstrap/js/src/dom/data";
import ShiftList from "../components/ShiftList";
import Calendar from "../components/Calendar";
import CreateShifts from "../modals/CreateShifts";
import DatePicker from "react-datepicker";
import CreateAutoShfits from "../modals/CreateAutoShfits";


const Shifts = observer(() => {
    const {shifts} = useContext(Context)
    const {user} = useContext(Context)

    const [createShiftModal, setCteateShiftModal] = useState(false);
    const [addShiftsModal, setAddShiftsModal] = useState(false);
    useEffect(() => {
        fetchCompanys().then(data => shifts.setCompanys(data))
        fetchShift().then(data => shifts.setShift(data));
    }, [])

    const [selectData, setSelectData] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const updatedDate = new Date(selectedDate);
    updatedDate.setDate(updatedDate.getDate() + 1);

    useEffect(() => {
    }, [selectData]);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectData(date);
        console.log('выбрана дата')
        console.log(date)
    };


    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const handleCompanySelected = (companyId) => {
        setSelectedCompanyId(companyId);
    };

    const updateShifts = async () => {
        const data = await fetchShift();
        shifts.setShift(data);
    };


    return (

        <Container>
            <Row>
                <Col md={2}>
                    <CompanysBar onCompanySelected={handleCompanySelected}/>
                </Col>
                <Col md={8}>
                    <ShiftList date={updatedDate} company={selectedCompanyId} onShiftDeleted={updateShifts}/>
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
                        <Button className="mt-2" variant="outline-primary" onClick={() => setCteateShiftModal(true)}>Add
                            a shift</Button>
                        <Button className="mt-2" variant="outline-primary" onClick={() => setAddShiftsModal(true)}>Add sfifts</Button>
                        <CreateShifts
                            show={createShiftModal}
                            onHide={() => setCteateShiftModal(false)}
                            date={updatedDate}
                            company={selectedCompanyId}
                        />
                        <CreateAutoShfits
                            show={addShiftsModal}
                            onHide={() => setAddShiftsModal(false)}
                            date={updatedDate}
                            />
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
