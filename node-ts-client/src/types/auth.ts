export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    username: string;
    role: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: User | null;
}