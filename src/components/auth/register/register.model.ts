export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}