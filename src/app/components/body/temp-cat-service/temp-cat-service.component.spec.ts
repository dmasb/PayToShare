import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempCatServiceComponent } from './temp-cat-service.component';

describe('TempCatServiceComponent', () => {
  let component: TempCatServiceComponent;
  let fixture: ComponentFixture<TempCatServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempCatServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempCatServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
