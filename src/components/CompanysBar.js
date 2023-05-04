import React, {useContext} from 'react';
import {makeObservable, observe} from "mobx";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CompanysBar = observer(() => {
const {shifts}=useContext(Context)

    return (

            <ListGroup className="mt-2">
                {shifts.companys.map(companys =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={companys.id === shifts.seelectedCopanys.id}
                       onClick={()=> shifts.setSeelectedCopanys(companys)}
                        key={companys.id}
                    >

                        {companys.name}
                    </ListGroup.Item>
                )}
            </ListGroup>

    );
});

export default CompanysBar;