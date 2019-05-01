import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormatComponent } from './update-format.component';

describe('UpdateFormatComponent', () => {
  let component: UpdateFormatComponent;
  let fixture: ComponentFixture<UpdateFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
