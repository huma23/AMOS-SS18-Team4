import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToAppWithParamsComponent } from './redirect-to-app-with-params.component';

describe('RedirectToAppWithParamsComponent', () => {
  let component: RedirectToAppWithParamsComponent;
  let fixture: ComponentFixture<RedirectToAppWithParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectToAppWithParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectToAppWithParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
