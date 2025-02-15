import { Component, OnInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { IOptionsDialogData, OptionsDialogComponent, IOptionsDialogButton } from 'src/app/components/options-dialog/options-dialog.component';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent extends BaseComponent implements AfterContentInit {
  options$: Observable<any>;

  constructor(
    // public cdr: ChangeDetectorRef,
    protected bottomSheet: MatBottomSheet
  ) { super(); }

  protected _setupOnInit() {
    this.listViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      return this.getAttr(options, attr.value, 'string');
    }));
    this.editViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      return this.getAttr(options, attr.editValue, 'string');
    }));

    this.options$ = this.attribute$.pipe(map(attr => {
      return this.getAttr(attr.config, 'options', 'listOfObj');
    }));
  }

  ngAfterContentInit() {
    this.automaticOptionShow();
  }

  automaticOptionShow() {
    if (this.edit) {
      this.presentActionSheet();
    }
  }

  async buttons(): Promise<IOptionsDialogButton[]> {
    const btns = await this.options$.pipe(take(1)).toPromise();
    const buttons = btns.map(o => {
      return {
        text: o.string,
        icon: 'chevron_right',
        handler: () => {
          console.log(o.id);
          this.update({ editValue: o.id });
          // this.cdr.detectChanges();
        }
      };
    });

    buttons.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel');
      }
    });
    return buttons;
  }


  async presentActionSheet() {
    const data: IOptionsDialogData = {};
    data.header = await this.description.pipe(take(1)).toPromise();
    data.buttons = await this.buttons();
    this.bottomSheet.open(OptionsDialogComponent, { data });
  }


}
