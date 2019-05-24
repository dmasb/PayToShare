import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanSaleComponent } from './add-plan-sale.component';

describe('AddPlanSaleComponent', () => {
  let component: AddPlanSaleComponent;
  let fixture: ComponentFixture<AddPlanSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
