import { Component, OnInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { SelectionComponent } from '../selection/selection.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-selection-img',
  templateUrl: './selection-img.component.html',
  styleUrls: ['./selection-img.component.scss']
})
export class SelectionImgComponent extends SelectionComponent implements AfterContentInit {

  public listViewImg: Observable<any>;
  imgOptions$: Observable<any>;

  constructor(
    protected bottomSheet: MatBottomSheet
  ) { super(bottomSheet); }

  automaticOptionShow() {}

  protected _setupOnInit() {
    this.listViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      return this.getAttr(options, attr.value, 'string');
    }));

    this.listViewImg = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'optionImages', 'listOfObj');
      return this.getAttr(options, attr.value, 'string');
    }));

    this.editViewValue = this.attribute$.pipe(map(attr => {
      const options = this.getAttr(attr.config, 'options', 'listOfObj');
      return this.getAttr(options, attr.editValue, 'string');
    }));

    this.options$ = this.attribute$.pipe(map(attr => {
      return this.getAttr(attr.config, 'options', 'listOfObj');
    }));

    this.imgOptions$ = this.attribute$.pipe(map(attr => {
      return this.getAttr(attr.config, 'optionImages', 'listOfObj');
    }));

  }



  public onImageTouch(imgOpt) {
    this.update({ editValue: imgOpt.id });
    // this.cdr.detectChanges();
  }

}
