import api from "./api";
import type { AuthResponse } from "../types/auth";

export const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: string;
}) => {
    const response = await api.post<AuthResponse>(
        "/auth/signup",
        userData
    );

    return response.data;
};

export const login = async (credentials: {
    email?: string;
    username?: string;
    password: string;
}) => {
    const response = await api.post<AuthResponse>(
        "/auth/login",
        credentials
    );

    return response.data;
};

export const logout = async () => {
    const response = await api.get<AuthResponse>(
        "/auth/logout"
    );

    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get<AuthResponse>(
        "/auth/me"
    );

    return response.data;
};
