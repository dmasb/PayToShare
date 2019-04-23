import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBtnComponent } from './admin-btn.component';

describe('AdminBtnComponent', () => {
  let component: AdminBtnComponent;
  let fixture: ComponentFixture<AdminBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
