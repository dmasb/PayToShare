import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOverviewComponent } from './category-overview.component';

describe('ProductOverviewComponent', () => {
  let component: CategoryOverviewComponent;
  let fixture: ComponentFixture<CategoryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
