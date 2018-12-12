import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatBottomSheetModule,
  MatGridListModule,
  MatCardModule,
  MatSliderModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatFormFieldModule,
  MatBadgeModule,
} from '@angular/material';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

const mat = [
  FlexLayoutModule,
  MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatDialogModule,
  MatInputModule, MatListModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatBottomSheetModule, MatGridListModule, MatCardModule, MatSliderModule,
  MatExpansionModule, MatSlideToggleModule, MatChipsModule, MatFormFieldModule,
  MatBadgeModule, ScrollDispatchModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...mat
  ],
  exports: [
    ...mat
  ]
})
export class MaterialModule { }
