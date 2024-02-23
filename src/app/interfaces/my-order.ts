import { MyOrderItem } from './my-order-item';

export interface MyOrder {
    id: number;
    transaction_id: string;
    user_id: number;
    code: string;
    checkout_email: string;
    first_name: string;
    last_name: string;
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
    my_order_items: MyOrderItem[];
}
