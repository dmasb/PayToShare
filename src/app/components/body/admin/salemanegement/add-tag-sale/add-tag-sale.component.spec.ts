import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagSaleComponent } from './add-tag-sale.component';

describe('AddTagSaleComponent', () => {
  let component: AddTagSaleComponent;
  let fixture: ComponentFixture<AddTagSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTagSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
