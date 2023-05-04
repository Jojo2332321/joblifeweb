import React, {useContext} from 'react';
import {Routes, Route ,Redirect} from 'react-router-dom'
import {authRoutes} from "../routes";
import {publicRoutes} from "../routes";
import Admin from "../pages/Admin";
import Settings from "../pages/Settings";
import Shifts from "../pages/Shifts";
import Workers from "../pages/Workers";
import Auth from "../pages/Auth"
import {Context} from "../index";
const AppRouter = () => {
    const {user} = useContext(Context);
    return (

        <div>
            <Routes>
{/*              НАДО СДЕЛВТЬ ЧЕРЕЗ МАССИВ... ТАК ТУПо и даже не законно

                {is Auth && authRoutes.map(({path,Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {publicRoutes.map(({path,Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}*/}
                {user.IsAuth && <Route path="/admin" element={<Admin/>}/>}
                {user.IsAuth && <Route path="/settings" element={<Settings/>}/>}
                {user.IsAuth && <Route path="/shifts" element={<Shifts/>}/>}
                {user.IsAuth && <Route path="/workers" element={<Workers/>}/>}

                <Route path="/login" element={<Auth/>}/>
                <Route path="/registration" element={<Auth/>}/>
            </Routes>
        </div>
    );
};

export default AppRouter;