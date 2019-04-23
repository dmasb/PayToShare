import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastAddComponent } from './fast-add.component';

describe('FastAddComponent', () => {
  let component: FastAddComponent;
  let fixture: ComponentFixture<FastAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
