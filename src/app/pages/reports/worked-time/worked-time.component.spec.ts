import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkedTimeComponent } from './worked-time.component';

describe('WorkedTimeComponent', () => {
  let component: WorkedTimeComponent;
  let fixture: ComponentFixture<WorkedTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkedTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkedTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
