import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFormatComponent } from './delete-format.component';

describe('DeleteFormatComponent', () => {
  let component: DeleteFormatComponent;
  let fixture: ComponentFixture<DeleteFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
