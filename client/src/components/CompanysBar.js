import React, {useContext} from 'react';
import {makeObservable, observe} from "mobx";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CompanysBar = observer(({onCompanySelected}) => {
    const {shifts} = useContext(Context)
    const handleCompanyClick = (company) => {
        shifts.setSeelectedCopanys(company);
        onCompanySelected(company.id);
        console.log('выбрана компания')
    };

    return (
        <ListGroup className="mt-2">
            {shifts.companys.map(companys =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={companys.id === shifts.seelectedCopanys.id}
                    onClick={() => handleCompanyClick(companys)}
                    key={companys.id}
                >
                    {companys.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default CompanysBar;