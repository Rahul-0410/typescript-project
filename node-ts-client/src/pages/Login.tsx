import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/getErrorMessage";

import "./Auth.css";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const isEmail = identifier.includes("@");

            await login({
                ...(isEmail
                    ? { email: identifier }
                    : { username: identifier }),
                password,
            });

            navigate("/books");
        } catch (error: unknown) {
            setError(
                getErrorMessage(error, "Login failed")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your BookStore account</p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="auth-group">
                        <label>
                            Email or Username
                        </label>

                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) =>
                                setIdentifier(e.target.value)
                            }
                            placeholder="Enter email or username"
                            required
                        />
                    </div>

                    <div className="auth-group">
                        <label>Password</label>

                        <div className="password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button
                        className="auth-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/signup">
                        Create one
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default Login;