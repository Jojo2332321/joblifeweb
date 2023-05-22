import React, {useContext} from 'react';
import {Form, Modal} from "react-bootstrap";
import {createWorker, fetchWorker} from "../http/ShiftsAPI";
import {Context} from "../index";

const ImportWorkersModalForb = ({show, onHide}) => {
    const {shifts}=useContext(Context)
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const workers = JSON.parse(event.target.result);

            for (const worker of workers) {
                const formData = new FormData();

                // Заполняем formData данными работника
                formData.append('firstname', worker.firstname)
                formData.append('surname', worker.surname,)
                formData.append('workPermitId', worker.workPermit,)
                formData.append('number', worker.number,)
                formData.append('age', worker.age,)
                formData.append('citizenship', worker.citizenship,)
                formData.append('workStatusId', worker.workStatus)
                formData.append('userid', localStorage.getItem('userId'))

                // Создаем работника
                await createWorker(formData);
            }

            // После того, как все работники добавлены, обновляем список работников
            fetchWorker().then(data => shifts.setWorker(data));
        };

        reader.readAsText(file);
        onHide()
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='sm'
            centered
        >
            <Modal.Header>

            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Import</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
};

export default ImportWorkersModalForb;