import { Item } from "./item";

export interface Category {
    categoryName: string;
    description: string;
    items: Item[];
}