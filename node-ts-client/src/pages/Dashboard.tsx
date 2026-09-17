import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Welcome {user?.name}</h2>

            <p>
                Email: {user?.email}
            </p>

            <p>
                Username: {user?.username}
            </p>

            <p>
                Role: {user?.role}
            </p>
        </div>
    );
};

export default Dashboard;