import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDotdComponent } from './add-dotd.component';

describe('AddDotdComponent', () => {
  let component: AddDotdComponent;
  let fixture: ComponentFixture<AddDotdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDotdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDotdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
