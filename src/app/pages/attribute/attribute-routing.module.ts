import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributePageComponent } from './attribute.component';

const routes: Routes = [
  {path: '', component: AttributePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }
