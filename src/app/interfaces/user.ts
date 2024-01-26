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
    birthday: number;
    message: string;
    role: Role;
}
