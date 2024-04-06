import PageRoutes from "../../constants/page-routes";
import ErrorPage from "./errors/ErrorPage";
import LoginLayout from "../../layout/LoginLayout";
import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";

const loginRouter = {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <LoginLayout/>,
    children: [
        {
            /*index: true,*/
            path: PageRoutes.LOGIN,
            element: <Login/>,
        },
        {
            path: PageRoutes.REGISTRATION,
            element: <Registration/>,
        },
    ],
}

export default loginRouter;