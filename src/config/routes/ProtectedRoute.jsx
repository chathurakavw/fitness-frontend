import PageRoutes from "../../constants/page-routes";
import AdminPanel from "../../pages/dashboard/admin-panel/AdminPanel";
import InstructorPanel from "../../pages/dashboard/instructer-panel/InstructorPanel";
import UserPanel from "../../pages/dashboard/user-panel/UserPanel";
import DashboardLayout from "../../layout/DashboardLayout";

const protectedRouter = {
    path: "/app",
    element: <DashboardLayout/>,
    children: [
        {
            path: PageRoutes.ADMINPANEL,
            element: <AdminPanel/>,
        },
        {
            path: PageRoutes.INSTRUCTORPANEL,
            element: <InstructorPanel/>,
        },
        {
            path: PageRoutes.USERPANEL,
            element: <UserPanel/>,
        },
    ],
}

export default protectedRouter;
