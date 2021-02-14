import { Component, Input, OnInit } from '@angular/core';
import { Catalog } from '../shared/catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  @Input()
  catalog!: Catalog;

  selectedCat = null;

  displayItems(item: string) {
    let foundItem = false;
    for (let i = 0; i < this.catalog.categories.length; i++) {
      if (this.catalog.categories[i].categoryName === item) {
        this.catalog.currentCategory = this.catalog.categories[i];
        foundItem = true;
      }
    }
    if (!foundItem) {
      this.catalog.currentCategory = undefined;
    }
  }
}
