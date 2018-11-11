import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

export interface IOptionsDialogData {
  header?: string;
  message?: string;
  buttons?: IOptionsDialogButton[];
}

export interface IOptionsDialogButton {
  text: string;
  icon?: string;
  handler: () => any;
}

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.css']
})
export class OptionsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatBottomSheetRef<OptionsDialogComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IOptionsDialogData
  ) { }

  ngOnInit() {
  }

  option(fn) {
    fn();
    this.dialogRef.dismiss();
  }

}
