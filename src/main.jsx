import {createRoot} from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "@/Routes.jsx";
import {ThemeSwitcher} from "@/components/theme-switcher.jsx";
import {ThemeProvider} from "@/providers/theme-provider.jsx";
import {Toaster} from "sonner";
import {Provider} from "react-redux";
import {store} from "@/app/store.js";

// Add dark mode class to the HTML element
document.documentElement.classList.add('light');

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider>
            <RouterProvider router={router}/>
            <Toaster position="top-center"/>
        </ThemeProvider>,
    </Provider>
)