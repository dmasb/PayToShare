import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensePanelComponent } from './license-panel.component';

describe('LicensePanelComponent', () => {
  let component: LicensePanelComponent;
  let fixture: ComponentFixture<LicensePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
