import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AssessmentQuery, AssessmentService } from 'src/app/store/assessment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selection-dialog',
  templateUrl: './selection-dialog.component.html',
  styleUrls: ['./selection-dialog.component.scss']
})
export class SelectionDialogComponent implements OnInit, OnDestroy {
  url: any;
  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data
    private assessQ: AssessmentQuery,
    private assessS: AssessmentService,
  ) { }

  public rowsLength$ = this.assessQ.lenght();
  private unSubRows: Subscription;
  public rows$ = this.assessQ.getRows();

  public loading$ = this.assessQ.selectLoading();
  public espaldera$ = this.assessQ.selectedEspaldera();
  public hilera$ = this.assessQ.selectedHilera();
  public hileras$ = this.assessQ.getCurrentHileras();

  ngOnInit() {
    console.log('url ', this.url);
    this.unSubRows = this.rowsLength$.subscribe(list => {
      console.log('list', list);
      if (!list) {
        this.assessS.setRowsAndColumns();
        console.log('loading rows');
      } else { console.log('already load the rows'); }
    });
  }

  ngOnDestroy() {
    this.unSubRows.unsubscribe();
  }

  exit(ready?: boolean) {
    this.dialogRef.close(ready);
  }

  select(e: number, h: number) {
    this.assessS.setEspalderaHilera(e, h);
    this.exit();
  }

  setE(e: number) {
    this.assessS.setEspaldera(e);
  }

  unsetE() {
    this.assessS.unsetEspaldera();
  }

  setH(h: number) {
    this.assessS.setHilera(h);
  }

  unsetH() {
    this.assessS.unsetHilera();
  }

  ready() {
    this.exit();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
