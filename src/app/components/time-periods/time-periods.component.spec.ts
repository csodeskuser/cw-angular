import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodsComponent } from './time-periods.component';

describe('TimePeriodsComponent', () => {
  let component: TimePeriodsComponent;
  let fixture: ComponentFixture<TimePeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePeriodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
