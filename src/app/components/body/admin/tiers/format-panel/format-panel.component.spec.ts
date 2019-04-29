import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatPanelComponent } from './format-panel.component';

describe('FormatPanelComponent', () => {
  let component: FormatPanelComponent;
  let fixture: ComponentFixture<FormatPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
