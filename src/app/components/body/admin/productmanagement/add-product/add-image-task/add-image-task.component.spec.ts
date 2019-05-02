import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageTaskComponent } from './add-image-task.component';

describe('AddImageTaskComponent', () => {
  let component: AddImageTaskComponent;
  let fixture: ComponentFixture<AddImageTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImageTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
