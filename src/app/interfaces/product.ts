import { Category } from "./category";

export interface Product {
    id: number;
    title: string;
    shortinfo: string;
    description: string;
    image: string;
    price: number;
    slug: string;
    category_id: Category;
    categoryname: string;
    categoryslug: string;
    created_at: string;
    updated_at: string;
    instock: number;
}
