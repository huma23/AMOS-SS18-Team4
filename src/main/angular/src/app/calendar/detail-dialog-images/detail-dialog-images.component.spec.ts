import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialogImagesComponent } from './detail-dialog-images.component';

describe('DetailDialogImagesComponent', () => {
  let component: DetailDialogImagesComponent;
  let fixture: ComponentFixture<DetailDialogImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDialogImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDialogImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
