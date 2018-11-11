import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessComponent } from './assess.component';

const routes: Routes = [
  { path: '', component: AssessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessRoutingModule { }
