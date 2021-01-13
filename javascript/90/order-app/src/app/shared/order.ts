import { Address } from "./address";
import { Item } from "./item";
import { Person } from "./person";

export interface Order {
    id: number;
    contact: Person;
    address: Address;
    date: string;
    item: Item;
    quantity: number;
}