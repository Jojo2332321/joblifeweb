import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Table} from "react-bootstrap";


const WorkersListInShifts = observer(() => {
    const {shifts}=useContext(Context)

    return (
        <Table className="mt-2" striped bordered hover >
            <thead>
            <tr>
                <th>firstname</th>
                <th>surname</th>
                <th>start</th>
                <th>end</th>
            </tr>
            </thead>
            <tbody>
            {shifts.worker.map(workers =>
                <tr
                    key={workers.id}
                >
                    <td>{workers.firstname}</td>
                    <td>{workers.surname}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td> <Button variant="outline-danger">удалить</Button>
                    </td>

                </tr>
            )}
            </tbody>
        </Table>
    );
});

export default WorkersListInShifts;