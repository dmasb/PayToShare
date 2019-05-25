import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetkeyComponent } from './getkey.component';

describe('GetkeyComponent', () => {
  let component: GetkeyComponent;
  let fixture: ComponentFixture<GetkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
