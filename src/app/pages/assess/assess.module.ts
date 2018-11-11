import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessRoutingModule } from './assess-routing.module';
import { AssessComponent } from './assess.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { ShareModule } from 'src/app/modules/share.module';
import { AttributeModule } from 'src/app/modules/attribute/attribute.module';

@NgModule({
  declarations: [
    AssessComponent,
  ],
  imports: [
    CommonModule,
    AssessRoutingModule,
    MaterialModule,
    ShareModule,
    AttributeModule
  ],
})
export class AssessPageModule { }
