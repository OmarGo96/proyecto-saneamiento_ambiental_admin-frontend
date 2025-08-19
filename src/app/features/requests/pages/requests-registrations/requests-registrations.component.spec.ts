import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRegistrationsComponent } from './requests-registrations.component';

describe('RequestsRegistrationsComponent', () => {
  let component: RequestsRegistrationsComponent;
  let fixture: ComponentFixture<RequestsRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsRegistrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
