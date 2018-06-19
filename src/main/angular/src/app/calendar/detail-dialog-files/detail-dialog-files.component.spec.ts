import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialogFilesComponent } from './detail-dialog-files.component';

describe('DetailDialogFilesComponent', () => {
  let component: DetailDialogFilesComponent;
  let fixture: ComponentFixture<DetailDialogFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDialogFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDialogFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
