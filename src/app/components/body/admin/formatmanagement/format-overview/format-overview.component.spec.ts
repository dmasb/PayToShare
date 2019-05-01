import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatOverviewComponent } from './format-overview.component';

describe('FormatOverviewComponent', () => {
  let component: FormatOverviewComponent;
  let fixture: ComponentFixture<FormatOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
