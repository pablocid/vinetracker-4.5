import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { OptionsDialogComponent } from '../components/options-dialog/options-dialog.component';
import { ImageShowDialogComponent } from '../components/image-show/image-show-dialog.component';
import { QrScanComponent } from '../components/qr-scan/qr-scan.component';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ImageToDataUrlModule
    ],
    exports: [
        ConfirmDialogComponent,
        OptionsDialogComponent,
        ImageShowDialogComponent,
        QrScanComponent,
        ImageToDataUrlModule
    ],
    entryComponents: [
        ConfirmDialogComponent,
        OptionsDialogComponent,
        ImageShowDialogComponent
    ],
    declarations: [
        ConfirmDialogComponent,
        OptionsDialogComponent,
        ImageShowDialogComponent,
        QrScanComponent
    ],
    providers: [],
})
export class ShareModule { }
