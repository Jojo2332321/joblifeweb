import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import ShiftsM from "./mobX/shiftsM";
import UserM from "./mobX/userM";
import FirmaM from "./mobX/firmaM";

export const Context = createContext(null)
/*console.log(process.env.REACT_APP_API_URL)*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(



    <React.StrictMode>

        <Context.Provider value={{
            user: new UserM(),
            shifts: new ShiftsM(),
            firma: new FirmaM(),
        }}>
        <App />

        </Context.Provider>
    </React.StrictMode>


);
