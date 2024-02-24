export interface OrderItem {
    id: number;
    checkout_id: number;
    product_id: number;
    title: string;
    image: string;
    price: number;
    slug: string;
    shortinfo: string;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
