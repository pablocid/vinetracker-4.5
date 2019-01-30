import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import { RowService, Row, RowQuery } from 'src/app/store/row';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { PlantListDialogComponent } from '../plant-list-dialog/plant-list-dialog.component';
import { IOptionsDialogData, OptionsDialogComponent } from 'src/app/components/options-dialog/options-dialog.component';
import { IConfirmDialogData, ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

export interface RowConfig {
  type: number;
  rows: Row[];
}

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantListComponent implements OnInit, AfterViewChecked {

  public currentIndex: number;

  constructor(
    // private actionSheetController: ActionSheetController,
    // private alertController: AlertController,
    private rowS: RowService,
    private rowQ: RowQuery,
    private cdr: ChangeDetectorRef,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) { }

  @Input() rowsConfig: RowConfig;
  @Input() editable: boolean;
  @Output() assess = new EventEmitter();
  @Output() changeDetection = new EventEmitter();
  @Output() savingAttr = new EventEmitter();

  // templates
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('fen1') fen1: TemplateRef<any>;
  @ViewChild('brix') brix: TemplateRef<any>;
  @ViewChild('fen0') fen0: TemplateRef<any>;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  public firstContentCheck = 0;

  ngOnInit() {
    this.setTemplate(this.rowsConfig.type);
    this.currentIndex = this.rowsConfig.rows.map(x => x.id).indexOf(this.rowQ.getActiveId());
  }

  ngAfterViewChecked() {
    if (this.currentIndex !== -1 && this.firstContentCheck < 3) {
      this.viewport.scrollToIndex(this.currentIndex, 'auto');
      this.firstContentCheck++;
      // console.log('ngAfterViewChecked', this.firstContentCheck);
    }
  }

  trackById(index, item) {
    return item.id;
  }

  private setTemplate(type: number) {
    if (type === 3) {
      try { this.entry.createEmbeddedView(this.fen1); } catch (e) { console.log('Error: No existe template para fenotipado 1'); }
    }
    if (type === 2) {
      try { this.entry.createEmbeddedView(this.brix); } catch (e) { console.log('Error: No existe template para fenotipado 1'); }
    }
    if (type === 1) {
      try { this.entry.createEmbeddedView(this.fen0); } catch (e) { console.log('Error: No existe template para fenotipado 1'); }
    }
    // this.cdr.detectChanges();
  }

  public setColor(row) {
    // if (row.discard) { return { item: 'danger', btn: 'light' }; }
    // if (!row.assessable) { return { item: 'light', btn: 'light', style: { color: 'rgb(150,150,150)' } }; }
    // // if (row.selected) { return { item: 'success', btn: 'light' }; }
    // if (row.created) { return { item: 'primary', btn: 'light' }; }

    return {};
  }

  public setColorClass(row) {
    if (row.discard) { return 'discard-row-item'; }
    if (row.created) { return 'created-row-item'; }
    if (!row.assessable) { return 'not-assessable-row-item'; }
    return 'not-created-row-item';
  }

  public assessment(id) {
    console.log('liked', id);
    this.assess.emit(id);
  }

  openBottomSheet(row: Row): void {
    const dialogRef = this.bottomSheet.open(PlantListDialogComponent, {
      data: {
        type: this.rowsConfig.type,
        row
      }
    });
    const dialog = dialogRef.afterDismissed().subscribe(x => {
      dialog.unsubscribe();
      console.log('x', x);
    });
  }

  async options(row: Row) {
    const data: IOptionsDialogData = {};
    data.header = 'Opciones fenotipado 0';
    data.buttons = this.buttonsMore(row);

    this.bottomSheet.open(OptionsDialogComponent, { data });

  }

  public buttonsMore(row: Row, opts?: { rowFilter: boolean }) {
    const btns = [];
    btns.push({
      text: 'Evaluar',
      icon: 'create',
      handler: () => {
        this.assessment(row.id);
      }
    });

    if (this.rowsConfig.type === 1) {
      btns.push({
        text: 'Planta sin racimos',
        icon: 'panorama_fish_eye',
        handler: () => {
          this.zeroClusterConfirm(row.id);
        }
      });

      btns.push({
        text: 'Descartar planta',
        icon: 'remove_circle',
        handler: () => {
          this.discardPlantConfirm(row);
        }
      });
    }

    if (this.rowsConfig.type === 2) {
      btns.push({ text: '18º Brix', icon: 'av_timer', handler: () => this.brixConfirm(row.id, 18) });
      btns.push({ text: '17º Brix', icon: 'av_timer', handler: () => this.brixConfirm(row.id, 17) });
      btns.push({ text: '16º Brix', icon: 'av_timer', handler: () => this.brixConfirm(row.id, 16) });
      btns.push({ text: '15º Brix', icon: 'av_timer', handler: () => this.brixConfirm(row.id, 15) });
      btns.push({ text: '14º Brix', icon: 'av_timer', handler: () => this.brixConfirm(row.id, 14) });
      btns.push({ text: '13º Brix', icon: 'av_timer', handler: () => this.brixConfirm(row.id, 13) });
      if (opts && opts.rowFilter) {
        btns.push({
          text: 'Descartar planta',
          icon: 'remove_circle',
          handler: () => {
            this.discardPlantConfirm(row);
          }
        });
      }
    }
    btns.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });

    return btns;
  }

  async more(row: Row, opts?: { rowFilter: boolean }) {
    const data: IOptionsDialogData = {};
    data.header = 'Opciones ºBrix';
    data.buttons = this.buttonsMore(row, opts);

    this.bottomSheet.open(OptionsDialogComponent, { data });
  }


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

  async zeroClusterConfirm(id) {
    const data: IConfirmDialogData = {};
    data.header = '0 racimos';
    data.message = 'La planta no tiene racimos ?';
    data.cancelLabel = 'Cancelar';
    data.okLabel = 'Sin racimos';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      console.log('UPDATE', id);
      this.savingAttr.emit();
      await this.rowS.updateAttr(id, '5808d1e9d48d17001006e43c', 0, {});
      // this.changeDetection.emit();
    }
  }

  async discardPlantConfirm(row: Row) {
    const data: IConfirmDialogData = {};
    data.header = 'Descartar';
    data.message = 'Descartar la planta ' + row.location + ' ?';
    data.cancelLabel = 'Cancelar';
    data.okLabel = 'Descartar';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const unsub = dialogRef.afterClosed().subscribe(x => {
      unsub.unsubscribe();
      if (x) {
        console.log('UPDATE', row.location);
        this.rowS.updateEntity(row.id, '5bd14b4bd71ef20014e4b327', 'no_selected', {})
          .then(() => {
            this.changeDetection.emit();
          });
      }
    });
  }

  async brixConfirm(id, value) {

    const data: IConfirmDialogData = {};
    data.header = value + 'ºBrix';
    data.cancelLabel = 'Cancelar';
    data.okLabel = 'Guardar';


    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    const result = await dialogRef.afterClosed().toPromise();
    console.log('Result from dialogRef', result);
    if (result) {
      await this.rowS.updateAttr(id, '57c84628ab66902c2208a855', value, {});
    }

  }


}
