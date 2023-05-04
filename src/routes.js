import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SETTINGS_ROUTE,
    SHIFTS_ROUTE,
    WORKERS_ROUTE
} from "./utils/consts";
import Settings from "./pages/Settings";
import Shifts from "./pages/Shifts";
import Workers from  "./pages/Workers"
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path:ADMIN_ROUTE,
        Component:Admin
    },
    {
        path:SETTINGS_ROUTE,
        Component:Settings
    },
    {
        path:SHIFTS_ROUTE,
        Component:Shifts
    },
    {
        path:WORKERS_ROUTE,
        Component:Workers
    }
]

export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },

    {
        path:REGISTRATION_ROUTE,
        Component:Auth
    },

]