import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectPanelComponent } from './object-panel.component';

describe('ObjectPanelComponent', () => {
  let component: ObjectPanelComponent;
  let fixture: ComponentFixture<ObjectPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
