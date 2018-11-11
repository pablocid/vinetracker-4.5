import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { OptionsDialogComponent } from '../components/options-dialog/options-dialog.component';
import { ImageShowDialogComponent } from '../components/image-show/image-show-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        ConfirmDialogComponent,
        OptionsDialogComponent,
        ImageShowDialogComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        OptionsDialogComponent,
        ImageShowDialogComponent
    ],
    declarations: [
        ConfirmDialogComponent,
        OptionsDialogComponent,
        ImageShowDialogComponent
    ],
    providers: [],
})
export class ShareModule { }
