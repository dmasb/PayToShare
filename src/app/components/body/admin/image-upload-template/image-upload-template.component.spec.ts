import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadTemplateComponent } from './image-upload-template.component';

describe('ImageUploadTemplateComponent', () => {
  let component: ImageUploadTemplateComponent;
  let fixture: ComponentFixture<ImageUploadTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
