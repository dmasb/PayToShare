import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotdOverviewComponent } from './dotd-overview.component';

describe('DotdManagementComponent', () => {
  let component: DotdOverviewComponent;
  let fixture: ComponentFixture<DotdOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotdOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotdOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
