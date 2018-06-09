import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleDropRessourceComponent } from './double-drop-ressource.component';

describe('DoubleDropRessourceComponent', () => {
  let component: DoubleDropRessourceComponent;
  let fixture: ComponentFixture<DoubleDropRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleDropRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleDropRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
