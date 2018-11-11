import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributePageComponent } from './attribute.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { ShareModule } from 'src/app/modules/share.module';
import { AttributeModule } from 'src/app/modules/attribute/attribute.module';

@NgModule({
  declarations: [AttributePageComponent],
  imports: [
    CommonModule,
    AttributeRoutingModule,
    MaterialModule,
    ShareModule,
    AttributeModule
  ]
})
export class AttributePageModule { }
