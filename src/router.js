import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { ErrorElement } from "./pages/ErrorElement";
import { loader as rootLoader } from './pages/Root';
import Summary, { loader as summaryLoader, action as summaryAction } from './pages/Summary';
import About from "./pages/About";
import Home from "./pages/Home";
import News from "./pages/News";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorElement />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <Home />,
                // loader: summaryLoader,
                // action: summaryAction,
            },
            {
                path: "/news",
                element: <News />,
            },
            // {
            //     path: "/about",
            //     element: <About />,
            // },
            // {
            //     path: "/contact",
            //     element: <Contact />,
            // },
            // {
            //     path: "/terms",
            //     element: <Terms />,
            // },
            // {
            //     path: "/privacy",
            //     element: <PrivacyPolicy />,
            // }
        ]
    }
])