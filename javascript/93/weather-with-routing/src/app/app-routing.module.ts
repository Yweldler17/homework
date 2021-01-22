import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { RouteTestingComponent } from './route-testing/route-testing.component';

const routes: Routes = [
  {
    path: 'details',
    component: DetailsComponent
  },

  {
    path: 'test',
    component: RouteTestingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
