
import { Home } from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import { Mood } from "./pages/Mood";
import { Help } from "./pages/Help";
import { Breathe } from "./pages/Breathe";
import { Error404 } from "./pages/Error404";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error404 />
    },
    {
        path: "/welcome",
        element: <Welcome />
    },
    {
        path: "/mood",
        element: <Mood />
    },
    {
        path: "/help",
        element: <Help />
    },
    {
        path: "/breathe",
        element: <Breathe />
    }
]);