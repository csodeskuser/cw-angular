import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProductivityComponent } from './daily-productivity.component';

describe('DailyProductivityComponent', () => {
  let component: DailyProductivityComponent;
  let fixture: ComponentFixture<DailyProductivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyProductivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
