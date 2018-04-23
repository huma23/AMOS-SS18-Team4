import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekItemComponent } from './calendar-week-item.component';

describe('CalendarWeekItemComponent', () => {
  let component: CalendarWeekItemComponent;
  let fixture: ComponentFixture<CalendarWeekItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarWeekItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarWeekItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
