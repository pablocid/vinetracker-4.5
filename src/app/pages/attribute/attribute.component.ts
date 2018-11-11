import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeQuery, AttributeService, AttributeStore } from 'src/app/store/attribute';
import { RowService } from 'src/app/store/row';
import { Location } from '@angular/common';
import { AttributeComponent } from 'src/app/modules/attribute/attribute.component';
import { IConfirmDialogData, ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { IOptionsDialogData, OptionsDialogComponent } from 'src/app/components/options-dialog/options-dialog.component';

@Component({
  selector: 'app-attribute-page',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributePageComponent implements OnInit {
  public showSave: boolean;

  constructor(
    private attrQ: AttributeQuery,
    private attrStore: AttributeStore,
    private location: Location,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  @ViewChild(AttributeComponent) child: AttributeComponent;

  public activeAttr$ = this.attrQ.selectActiveId();

  ngOnInit() {
    this.showSave = this.attrQ.getActiveId() === '581a356c5c0eac001077ad6e' ? false : true;
  }
  public goBack() {
    this.location.back();
  }

  async goBackConfirm() {
    if (!this.showSave) {
      this.goBack();
      return;
    }
    const data: IConfirmDialogData = {};
    data.header = 'Salir';
    data.message = 'Desea salir sin guardar los cambios?';
    data.okLabel = 'Salir';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const unsub = dialogRef.afterClosed().subscribe(x => {
      unsub.unsubscribe();
      // console.log('dialog', x);
      if (x) {
        this.attrStore.updateActive({ editValue: undefined });
        this.goBack();
      }
    });
  }


  public async save() {
    this.child.saveAndGoBack();
  }

  // public async saveSignalFromComponent($event) {
  //   console.log('$event save', $event);
  //   await this.attrS.updateActiveAttr($event.value, $event.options, false);
  // }

  async saveConfirm() {
    const data: IConfirmDialogData = {};
    data.header = '¿Guardar?';
    data.message = 'Desea guardar los cambios';
    data.okLabel = 'Guardar';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const unsub = dialogRef.afterClosed().subscribe(x => {
      unsub.unsubscribe();
      // console.log('dialog', x);
      if (x) {
        this.save();
      }
    });
  }

  async deleteConfirm() {
    const data: IConfirmDialogData = {};
    data.header = 'Eliminar atributo';
    data.message = 'Deseas eliminar el atributo ? ';
    data.okLabel = 'ELIMINAR';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const unsub = dialogRef.afterClosed().subscribe(x => {
      unsub.unsubscribe();
      // console.log('dialog', x);
      if (x) {
        this.delete();
      }
    });
  }

  delete() {
    this.child.deleteAndGoBack();
  }

  async more() {
    const data: IOptionsDialogData = {};
    data.header = 'Opciones';
    data.buttons = [{
      text: 'Eliminar atributo',
      icon: 'delete',
      handler: () => {
        this.deleteConfirm();
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];

    this.bottomSheet.open(OptionsDialogComponent, { data });

  }


}
