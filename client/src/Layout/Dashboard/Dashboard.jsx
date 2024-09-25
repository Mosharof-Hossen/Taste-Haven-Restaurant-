import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;