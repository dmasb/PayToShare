import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageMycartComponent } from './mypage-mycart.component';

describe('MypageMycartComponent', () => {
  let component: MypageMycartComponent;
  let fixture: ComponentFixture<MypageMycartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageMycartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageMycartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
