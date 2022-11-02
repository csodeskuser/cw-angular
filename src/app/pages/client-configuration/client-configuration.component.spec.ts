import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigurationComponent } from './client-configuration.component';

describe('ClientConfigurationComponent', () => {
  let component: ClientConfigurationComponent;
  let fixture: ComponentFixture<ClientConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
