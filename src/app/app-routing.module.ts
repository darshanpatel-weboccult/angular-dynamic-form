import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingFormComponent } from './Components/housing-form/housing-form.component';
import { DisplayComponent } from './Components/display/display.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'housing-form'
  },
  {
    path:'housing-form',
    component: HousingFormComponent
  },
  {
    path:'display',
    component: DisplayComponent
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'housing-form'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
