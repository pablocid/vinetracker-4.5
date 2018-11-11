import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantListDialogComponent } from './plant-list-dialog.component';

describe('PlantListDialogComponent', () => {
  let component: PlantListDialogComponent;
  let fixture: ComponentFixture<PlantListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
