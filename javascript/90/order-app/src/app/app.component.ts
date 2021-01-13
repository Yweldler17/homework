import { Component } from '@angular/core';
import { Order } from './shared/order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'order-app';

  order: Order = {
    id: 1234,
    contact: {
      firstName: 'Charlie',
      lastName: 'Bergsteinfeld'
    },
    address: {
      street: '123 Main Ave',
      city: 'Passaic',
      state: 'NJ',
      zip: '07055',
      country: 'USA'
    },
    date: '01/12/2021',
    item: {
      modelNumber: 'SLT3-2448C',
      description: 'NPS Science Lab Table, Steel Adjustable Height Legs, 24"x48" with a Chem-Res Tabletop',
      price: 349
    },
    quantity: 3
  }

}
