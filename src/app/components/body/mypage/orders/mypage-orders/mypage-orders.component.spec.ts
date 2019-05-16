import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageOrdersComponent } from './mypage-orders.component';

describe('MypageOrdersComponent', () => {
  let component: MypageOrdersComponent;
  let fixture: ComponentFixture<MypageOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
