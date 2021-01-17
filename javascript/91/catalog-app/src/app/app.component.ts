import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { Catalog } from './shared/catalog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catalog-app';

  catalog: Catalog = {
    categories: [{
      categoryName: 'Games',
      description: 'Thrilling board games, excellent for quarantine family time',
      items: [
        {
          modelNumber: 'Chess',
          description: 'Timeless classic, considered by many to be the greatest board game created.',
          price: 29
        },
        {
          modelNumber: 'Ticket To Ride',
          description: 'Intense race across the country. Has a great pace and is simple to learn',
          price: 58
        },
        {
          modelNumber: 'Settlers of Catan',
          description: 'Brilliantly creative, each game has a unique setup. Great for competitive groups.',
          price: 47
        }
      ]
    },
    {
      categoryName: 'Toys',
      description: 'Kids toys, keep them fascinated for hours...',
      items: [
        {
          modelNumber: 'Lego',
          description: 'The classic building game for beginners. Avoid stepping on peices, very painful.',
          price: 36
        },
        {
          modelNumber: 'Magnet Tiles',
          description: 'Quick easy fun for all ages.',
          price: 74
        },
        {
          modelNumber: 'Wooden Train Set',
          description: 'Great for building creativity and imagination.',
          price: 99
        }
      ]
    },
    {
      categoryName: 'Bikes',
      description: 'Durable well made bicycles',
      items: [
      ]
    }],
    contact: {
      firstName: 'Charlie',
      lastName: 'Bergsteinfeld',
      address: {
        street: '123 Main Ave',
        city: 'Passaic',
        state: 'NJ',
        zip: '07055',
        country: 'USA'
      },
    }
  }
}

