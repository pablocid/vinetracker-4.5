import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_DIALOG_DATA } from '@angular/material';
import { Row } from 'src/app/store/row';

export interface DialogData {
  type: number;
  row: Row;
}

@Component({
  selector: 'app-plant-list-dialog',
  templateUrl: './plant-list-dialog.component.html',
  styleUrls: ['./plant-list-dialog.component.css']
})
export class PlantListDialogComponent implements OnInit {
  row: Row;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<PlantListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.row = this.data.row;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {

  }

  setOptions(type) {
    const options = [];
    if (type === 1) {
      options.push({
        text: 'Planta sin racimos',
        icon: 'radio-button-off',
        handler: () => {
          // this.zeroClusterConfirm(row.id);
        }
      });
    }

  }


async zeroClusterConfirm(id) {
    // const alert = await this.alertController.create({
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
    // });

    // await alert.present();
  }

}
