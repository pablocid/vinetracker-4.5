import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RowRoutingModule } from './row-routing.module';
import { RowComponent } from './row.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantListDialogComponent } from './plant-list-dialog/plant-list-dialog.component';
import { ShareModule } from 'src/app/modules/share.module';

@NgModule({
  declarations: [RowComponent, PlantListComponent, PlantListDialogComponent],
  entryComponents: [ PlantListDialogComponent ],
  imports: [
    CommonModule,
    RowRoutingModule,
    MaterialModule,
    ShareModule
  ]
})
export class RowPageModule { }
