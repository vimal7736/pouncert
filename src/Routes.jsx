import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import Weather from "@/pages/Weather.jsx";
import MaybeMachine from "@/pages/MaybeMachine.jsx";
import Cryptoverse from "@/pages/Cryptoverse.jsx";
import MinimalistDataAnalystRoadmap from "@/pages/MinimalistDataAnalystRoadmap.jsx";
import FullStackJavaScriptRoadmap from "@/pages/FullStackJavaScriptRoadmap.jsx";


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
    {
        path: "/crypto_verse",
        element:<Cryptoverse/>
    },
    {
        path: "/data_analyst",
        element:<MinimalistDataAnalystRoadmap/>
    },
    {
        path: "/FullStackJavaScriptRoadmap",
        element:<FullStackJavaScriptRoadmap />
    },
])