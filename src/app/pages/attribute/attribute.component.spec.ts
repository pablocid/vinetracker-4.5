import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributePageComponent } from './attribute.component';

describe('AttributeComponent', () => {
  let component: AttributePageComponent;
  let fixture: ComponentFixture<AttributePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
