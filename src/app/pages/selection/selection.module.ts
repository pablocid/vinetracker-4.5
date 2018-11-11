import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { SelectionDialogComponent } from './selection-dialog/selection-dialog.component';
import { ShareModule } from 'src/app/modules/share.module';

@NgModule({
  declarations: [SelectionComponent, SelectionDialogComponent],
  entryComponents: [ SelectionDialogComponent ],
  imports: [
    CommonModule,
    SelectionRoutingModule,
    MaterialModule,
    ShareModule
  ]
})
export class SelectionPageModule { }
