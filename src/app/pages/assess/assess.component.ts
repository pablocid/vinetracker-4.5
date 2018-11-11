import { Component, OnInit } from '@angular/core';
import { EvaluationsQuery } from 'src/app/store/evaluations';
import { RowQuery, RowService } from 'src/app/store/row';
import { AttributeService, AttributeQuery } from 'src/app/store/attribute';
import { AssessmentService, AssessmentQuery } from 'src/app/store/assessment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { take, map } from 'rxjs/operators';
import { IConfirmDialogData, ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {

  constructor(
    private location: Location,
    private evalQ: EvaluationsQuery,
    private rowQ: RowQuery,
    private rowS: RowService,
    private attrS: AttributeService,
    private attrQ: AttributeQuery,
    private assessS: AssessmentService,
    private assessQ: AssessmentQuery,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public canEdit$ = this.evalQ.selectActive().pipe(map(e => e.editable));
  public assessLoading$ = this.assessQ.selectLoading();
  private active = this.evalQ.selectActive();
  public name$ = this.active.pipe(map(x => x.label));
  public position$ = this.rowQ.selectActive().pipe(map(x => x.location));

  public activeAttr = this.attrQ.selectIds();
  public attrNoAssessed$ = this.attrQ.selectAll()
    .pipe(map(x => x.filter(f =>
      f.id !== '57c42f77c8307cd5b82f4486' &&
      f.id !== '5808de89832db50010d3192c' &&
      f.id !== '57c8a0cca774d31000b71cd4' &&
      f.id !== '5851acbc0cb9af001119793e' &&
      f.id !== '5bd14b4bd71ef20014e4b327' &&
      (f.value === null || f.value === undefined))))
    .pipe(map(x => x.map(att => {
      return {
        ...att,
        name: this.getAttr(att.config, 'label', 'string')
      };
    })));

  public ss = ['5808de89832db50010d3192c',
    '580c121390cc2700100db1d3', '57c8a0cca774d31000b71cd4',
    '5851a6970cb9af0011197939', '580c0caf90cc2700100db1d2',
    '580c082b12e1240010cd9d64', '5851a7fc0cb9af001119793a'];

  ngOnInit() {

  }
  assessAttr(attrId) {
    console.log('EValuar', attrId);
    this.attrS.setActive(attrId);
    this.router.navigate(['attribute']);
  }

  updateAssess() {
    this.assessS.getAssessment();
  }

  public goBack() {
    this.rowS.updateRowItem();
    this.location.back();
  }

  public async goBackConfirm() {
    const attrs = await this.attrNoAssessed$.pipe(take(1)).toPromise();
    if (attrs.length) {
      this.presentAlertConfirm();
    } else {
      this.goBack();
    }
  }


  async presentAlertConfirm() {

    const data: IConfirmDialogData = {};
    data.header = 'Salir ?';
    data.message = 'Faltan datos por registrar!';
    data.cancelLabel = 'Seguir evaluando';
    data.okLabel = 'Salir';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const unsub = dialogRef.afterClosed().subscribe(x => {
      unsub.unsubscribe();
      if (x) { this.goBack(); }
    });

  }

  public getAttr(attrs, id, dd) {
    const index = attrs.map(x => x.id).indexOf(id);
    if (index === -1) { return undefined; }
    return attrs[index][dd];
  }

}
