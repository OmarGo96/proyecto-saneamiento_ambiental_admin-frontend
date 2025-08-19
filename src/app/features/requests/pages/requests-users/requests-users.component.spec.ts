import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsUsersComponent } from './requests-users.component';

describe('RequestsUsersComponent', () => {
  let component: RequestsUsersComponent;
  let fixture: ComponentFixture<RequestsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
