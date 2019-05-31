import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncludedProductsComponent } from './view-included-products.component';

describe('ViewIncludedProductsComponent', () => {
  let component: ViewIncludedProductsComponent;
  let fixture: ComponentFixture<ViewIncludedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIncludedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIncludedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
