import { Category } from "./category";
import { Item } from "./item";
import { Person } from "./person";

export interface Catalog {
    categories: Category[];
    contact: Person;
    currentCategory?: Category;
}