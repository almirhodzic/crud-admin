import { Role } from "./role";

export interface User {
    id: number;
    uuid: string;
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
    created_at: Date;
    updated_at: Date;
    role: Role;
    email_verified_at: Date;
}
