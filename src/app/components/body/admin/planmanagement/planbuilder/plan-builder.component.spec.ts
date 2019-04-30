import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanBuilderComponent } from './plan-builder.component';

describe('PlanBuilderComponent', () => {
  let component: PlanBuilderComponent;
  let fixture: ComponentFixture<PlanBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
