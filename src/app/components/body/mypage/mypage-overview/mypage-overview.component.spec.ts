import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageOverviewComponent } from './mypage-overview.component';

describe('MypageOverviewComponent', () => {
  let component: MypageOverviewComponent;
  let fixture: ComponentFixture<MypageOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
