import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-container">

                <div className="dashboard-header">
                    <h1>Dashboard</h1>

                    <p>
                        Welcome back, {user.name}
                    </p>
                </div>

                <div className="dashboard-grid">

                    <div className="dashboard-card">

                        <h2>Profile Information</h2>

                        <div className="profile-row">
                            <span className="profile-label">
                                Name
                            </span>

                            <span className="profile-value">
                                {user.name}
                            </span>
                        </div>

                        <div className="profile-row">
                            <span className="profile-label">
                                Email
                            </span>

                            <span className="profile-value">
                                {user.email}
                            </span>
                        </div>

                        <div className="profile-row">
                            <span className="profile-label">
                                Username
                            </span>

                            <span className="profile-value">
                                {user.username}
                            </span>
                        </div>

                        <div className="profile-row">
                            <span className="profile-label">
                                Phone
                            </span>

                            <span className="profile-value">
                                {user.phone}
                            </span>
                        </div>

                        <div className="profile-row">
                            <span className="profile-label">
                                Role
                            </span>

                            <span className="profile-value">
                                <span className="role-badge">
                                    {user.role}
                                </span>
                            </span>
                        </div>

                    </div>

                    <div className="dashboard-card">

                        <h2>Account</h2>

                        <div className="dashboard-stat">

                            <h3>✓</h3>

                            <p>
                                Account authenticated
                            </p>

                        </div>

                        <div className="dashboard-stat">

                            <h3>Books</h3>

                            <p>
                                Browse and manage books
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;