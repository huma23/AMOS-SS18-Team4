import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialogInfoComponent } from './detail-dialog-info.component';

describe('DetailDialogInfoComponent', () => {
  let component: DetailDialogInfoComponent;
  let fixture: ComponentFixture<DetailDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
