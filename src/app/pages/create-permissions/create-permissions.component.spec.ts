import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermissionsComponent } from './create-permissions.component';

describe('CreatePermissionsComponent', () => {
  let component: CreatePermissionsComponent;
  let fixture: ComponentFixture<CreatePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
