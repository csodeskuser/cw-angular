import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCollectorComponent } from './log-collector.component';

describe('LogCollectorComponent', () => {
  let component: LogCollectorComponent;
  let fixture: ComponentFixture<LogCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogCollectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
