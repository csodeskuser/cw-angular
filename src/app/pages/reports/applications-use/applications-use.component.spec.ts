import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsUseComponent } from './applications-use.component';

describe('ApplicationsUseComponent', () => {
  let component: ApplicationsUseComponent;
  let fixture: ComponentFixture<ApplicationsUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
