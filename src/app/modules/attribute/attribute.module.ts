import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute.component';
import { MaterialModule } from '../material.module';
import { ShareModule } from '../share.module';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';
import { BaseComponent } from './base/base.component';
import { FormsModule } from '@angular/forms';
import { SelectionComponent } from './base/selection/selection.component';
import { NumericListComponent } from './base/numeric-list/numeric-list.component';
import { MultipleSelectionComponent } from './base/multiple-selection/multiple-selection.component';
import { NotesComponent } from './base/notes/notes.component';
import { SelectionImgComponent } from './base/selection-img/selection-img.component';
import { ImageCaptureComponent } from './base/image-capture/image-capture.component';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';

const inputs = [
  BaseComponent, SelectionComponent,
  NumericListComponent, MultipleSelectionComponent,
  NotesComponent, SelectionImgComponent, ImageCaptureComponent
];

@NgModule({
  declarations: [
    AttributeComponent,
    ImagePickerComponent,
    ...inputs
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ShareModule,
    ImageToDataUrlModule,
    FormsModule,
  ],
  exports: [
    AttributeComponent
  ],
  entryComponents: [
    ...inputs
  ]
})
export class AttributeModule { }
