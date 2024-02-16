import { Role } from "./role";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
    zipcode: string;
    country: string;
    phone: number;
    message: string;
    avatar: string;
    role: Role;
    email_verified_at: Date;
}
