import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IImageShowDialogData {
  header?: string;
  url?: string;
}

@Component({
  selector: 'app-image-show-dialog',
  templateUrl: './image-show-dialog.component.html',
  styleUrls: ['./image-show-dialog.component.css']
})
export class ImageShowDialogComponent implements OnInit {
  public header: string;
  public url: string;

  constructor(
    public dialogRef: MatDialogRef<ImageShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IImageShowDialogData
  ) {
    this.header = this.data.header ? this.data.header : 'Confirmar';
    this.url = this.data.url ? this.data.url : '';
  }

  ngOnInit() {
  }

  option(bool) {
    this.dialogRef.close(bool);
  }

}
