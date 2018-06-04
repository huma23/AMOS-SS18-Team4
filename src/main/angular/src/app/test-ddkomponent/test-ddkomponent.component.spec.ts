import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDdkomponentComponent } from './test-ddkomponent.component';

describe('TestDdkomponentComponent', () => {
  let component: TestDdkomponentComponent;
  let fixture: ComponentFixture<TestDdkomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDdkomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDdkomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
