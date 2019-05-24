import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLicenseSaleComponent } from './add-license-sale.component';

describe('AddLicenseSaleComponent', () => {
  let component: AddLicenseSaleComponent;
  let fixture: ComponentFixture<AddLicenseSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLicenseSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLicenseSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
