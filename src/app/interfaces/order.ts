import { OrderItem } from './order-item';

export interface Order {
    id: number;
    transaction_id: string;
    user_id: number;
    code: string;
    checkout_email: string;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zipcode: number;
    complete: number;
    created_at: string;
    updated_at: string;
    totalprice: number;
    totalproducts: number;
    my_order_items: OrderItem[];
}
