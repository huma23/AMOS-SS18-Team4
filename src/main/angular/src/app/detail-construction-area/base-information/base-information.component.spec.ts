import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInformationComponent } from './base-information.component';

describe('BaseInformationComponent', () => {
  let component: BaseInformationComponent;
  let fixture: ComponentFixture<BaseInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
