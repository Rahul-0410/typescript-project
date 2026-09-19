import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <Link to="/books" className="navbar-logo">
                    BookStore
                </Link>

                <div className="navbar-links">

                    <Link to="/books">
                        Books
                    </Link>

                    {user && (
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    )}

                    {!user ? (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/signup">
                                Signup
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="navbar-user">
                                {user.name} ({user.role})
                            </span>

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;