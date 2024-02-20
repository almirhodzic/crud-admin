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
    instock: number;
}
