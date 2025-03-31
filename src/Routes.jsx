import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import Weather from "@/pages/Weather.jsx";
import MaybeMachine from "@/pages/MaybeMachine.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/weather",
        element:<Weather/>
    },{
        path: "/may_be_machine",
        element:<MaybeMachine/>
    },
])