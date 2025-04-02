import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import Weather from "@/pages/Weather.jsx";
import MaybeMachine from "@/pages/MaybeMachine.jsx";
import Cryptoverse from "@/pages/Cryptoverse.jsx";
import MinimalistDataAnalystRoadmap from "@/pages/MinimalistDataAnalystRoadmap.jsx";
import FullStackJavaScriptRoadmap from "@/pages/FullStackJavaScriptRoadmap.jsx";
import PoemPage from "@/pages/PoemPage.jsx";
import TypingPractice from "@/pages/TypingPractice.jsx";
import CryptoHope from "@/cryptoPage/CryptoHope.jsx";
import Exchange from "@/cryptoPage/Exchange.jsx";
import News from "@/cryptoPage/News.jsx";
import CryptoDetails from "@/cryptoPage/CryptoDetails.jsx";


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
    {
        path: "/PoemPage",
        element:<PoemPage />
    },
    {
        path: "/TypingPractice",
        element:<TypingPractice />
    },
])