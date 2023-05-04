import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {Navigate, NavLink, useLocation, useNavigate,} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHIFTS_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";

import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname ===LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async ()=> {
    try {
        let data;
        if (isLogin){
            data = await login(email, password)
        }else {
            data = await registration(email,password)
        }

        user.setUser(data)
        user.setIsAuth(true)
        navigate(SHIFTS_ROUTE)
    }catch (e){
        alert(e.response.data.message)
    }
    }


    return (
        <Container
         className="d-flex justify-content-center align-items-center"
         style={{height: window.innerHeight -30}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">

                    <Form.Control
                        className="mt-2"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </Form>

                <Form className="d-flex justify-content-between mt-3">

                    {isLogin ?
                        <div>
                            <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                        </div>
                        :
                        <div>
                            <NavLink to={LOGIN_ROUTE}>Authorization</NavLink>
                        </div>
                    }
                    <Button
                        variant={"outline-success"}
                        onClick={click}
                        className="mt-2 align-self-end">
                        {isLogin ? "Enter" : "Registration"}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;