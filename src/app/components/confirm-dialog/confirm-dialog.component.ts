import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IConfirmDialogData {
  header?: string;
  message?: string;
  cancelLabel?: string;
  okLabel?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public ok: string;
  public cancel: string;
  public header: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData
  ) {
    this.ok = this.data.okLabel ? this.data.okLabel : 'OK';
    this.cancel = this.data.cancelLabel ? this.data.cancelLabel : 'Cancelar';
    this.header = this.data.header ? this.data.header : 'Confirmar';
    this.message = this.data.message ? this.data.message : '';
  }

  ngOnInit() {
  }

  option(bool) {
    this.dialogRef.close(bool);
  }


  // {
  //   header: 'Planta sin racimo!',
  //   // message: 'Message <strong>text</strong>!!!',
  //   buttons: [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       cssClass: 'secondary',
  //       handler: (blah) => {
  //         console.log('Confirm Cancel: blah');
  //       }
  //     }, {
  //       text: 'Guardar',
  //       handler: async () => {
  //         console.log('Confirm Okay');
  //         await this.rowS.updateAttr(id, '5808d1e9d48d17001006e43c', 0, {});
  //         this.changeDetection.emit();
  //       }
  //     }
  //   ]
  // }

}
