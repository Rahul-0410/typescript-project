import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import {
    login as loginUser,
    logout as logoutUser,
    signup as signupUser,
} from "../services/authService";

import type { User } from "../types/auth";

interface SignupData {
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: string;
}

interface LoginData {
    email?: string;
    username?: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (data: LoginData) => {
        const response = await loginUser(data);

        if (!response.success || !response.data) {
            throw new Error(response.message);
        }

        setUser(response.data);
    };

    const signup = async (data: SignupData) => {
        const response = await signupUser(data);

        if (!response.success || !response.data) {
            throw new Error(response.message);
        }

        setUser(response.data);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};