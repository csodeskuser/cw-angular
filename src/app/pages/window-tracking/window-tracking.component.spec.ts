import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTrackingComponent } from './window-tracking.component';

describe('WindowTrackingComponent', () => {
  let component: WindowTrackingComponent;
  let fixture: ComponentFixture<WindowTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
