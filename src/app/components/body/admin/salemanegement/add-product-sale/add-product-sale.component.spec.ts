import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSaleComponent } from './add-product-sale.component';

describe('AddProductSaleComponent', () => {
  let component: AddProductSaleComponent;
  let fixture: ComponentFixture<AddProductSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
