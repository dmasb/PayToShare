import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaninfoComponent } from './planinfo.component';

describe('PlaninfoComponent', () => {
  let component: PlaninfoComponent;
  let fixture: ComponentFixture<PlaninfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaninfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
