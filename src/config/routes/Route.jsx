import {createBrowserRouter} from "react-router-dom";
import protectedRouter from "./ProtectedRoute";
import loginRoute from "./loginRoute";
import HomeLayout from "../../layout/HomeLayout";
import Home from "../../pages/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
        ],
    },
    loginRoute,
    protectedRouter
]);

export default router;
