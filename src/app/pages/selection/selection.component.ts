import { Component, OnInit } from '@angular/core';
import { EvaluationsQuery } from 'src/app/store/evaluations';
import { AssessmentService, AssessmentQuery } from 'src/app/store/assessment';
import { Router } from '@angular/router';
import { RowService } from 'src/app/store/row';
import { Location } from '@angular/common';
import { SelectionDialogComponent } from './selection-dialog/selection-dialog.component';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { ConfirmDialogComponent, IConfirmDialogData } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { IOptionsDialogData, OptionsDialogComponent } from 'src/app/components/options-dialog/options-dialog.component';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  constructor(
    private evalQ: EvaluationsQuery,
    private assessS: AssessmentService,
    private assessQ: AssessmentQuery,
    public router: Router,
    public rowS: RowService,
    public location: Location,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  public assessmentName$ = this.evalQ.selectActive(s => s.label);
  public isLoggin$ = this.assessQ.selectLoading();

  ngOnInit() {
  }

  public goBack() {
    this.location.back();
  }

  async getCode(code: string) {
    console.log('CODE', code);
    if (code) {
      await this.assessS.setEHPfromScanCode(code);
      this.rowS.getRow();
      this.router.navigate(['row']);
    } else {
      alert('Error de lectura');
    }
  }

  async singleAssessment(code: string) {
    console.log('CODE', code);
    if (code) {
      await this.assessS.setEHPfromScanCode(code);
      await this.rowS.setSingleItemRow();
      this.router.navigate(['assess']);
    }
  }

  // async confirm() {
  //   const data: IConfirmDialogData = {};
  //   data.header = 'Options';
  //   data.buttons = [
  //     { text: ' cero racimos', handler: () => {
  //       console.log('Cero racimo');
  //     }}
  //   ];

  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
  // }

  async confirm() {
    const data: IConfirmDialogData = {};
    data.header = 'Options';
    data.message = 'La planta no tiene racimos ?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const unsub = dialogRef.afterClosed().subscribe(x => {
      unsub.unsubscribe();
      console.log('dialog', x);
    });
  }

  async options() {
    const data: IOptionsDialogData = {};
    data.header = 'Opciones';
    data.buttons = [
      {
        text: ' Cero racimos',
        icon: 'panorama_fish_eye',
        handler: () => {
          console.log('Apretaste cero racimo');
        }
      }
    ];

    this.bottomSheet.open(OptionsDialogComponent, { data });

  }

  async presentModal() {

    const dialogRef = this.dialog.open(
      SelectionDialogComponent, {
        backdropClass: 'logindialog-overlay',
        panelClass: 'logindialog-panel',
        height: '100%',
        // data: {name: this.name, animal: this.animal}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);
      if (result) {
        this.router.navigate(['row']);
        this.rowS.getRow();
      }
    });


    // const modal = await this.modalController.create({
    //   component: RowsModalComponent,
    //   componentProps: { value: 123 }
    // });

    // await modal.present();
    // const diss = await modal.onDidDismiss();
    // console.log('dissmissed', diss);
    // if (diss.data) {
    //   this.router.navigate(['row']);
    //   this.rowS.getRow();
    // }
  }



}
