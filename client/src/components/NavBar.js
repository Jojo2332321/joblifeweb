import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {LOGIN_ROUTE, SETTINGS_ROUTE, SHIFTS_ROUTE, WORKERS_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }

    const toShifts = () =>{
        navigate(SHIFTS_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:"white"}} to={SHIFTS_ROUTE}>Job Life</NavLink>
                {user._isAuth ?
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} className="me-2" onClick={() =>(toShifts())} >Shifts</Button>
                        <Button variant={"outline-light"} className="me-2" onClick={() =>navigate(WORKERS_ROUTE)}>Workers</Button>
                        <Button variant={"outline-light"} className="me-2" onClick={() =>navigate(SETTINGS_ROUTE)}>Opttions</Button>
                        <Button variant={"outline-light"} onClick={() => logOut()} >Exit</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)} >Authorization</Button>

                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;