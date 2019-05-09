import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSaleComponent } from './delete-sale.component';

describe('DeleteSaleComponent', () => {
  let component: DeleteSaleComponent;
  let fixture: ComponentFixture<DeleteSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
