import { Category } from "./category";

export interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category_id: Category;
    categoryname: string;
    categoryslug: string;
    instock: number;
}
