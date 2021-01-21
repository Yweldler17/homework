import { Component, Input, OnInit } from '@angular/core';

import { Details } from '../shared/details';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  @Input()
  details!: Details;

}
