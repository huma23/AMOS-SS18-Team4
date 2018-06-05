import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceConstructionAreaComponent } from './resource-construction-area.component';

describe('ResourceConstructionAreaComponent', () => {
  let component: ResourceConstructionAreaComponent;
  let fixture: ComponentFixture<ResourceConstructionAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceConstructionAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceConstructionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
