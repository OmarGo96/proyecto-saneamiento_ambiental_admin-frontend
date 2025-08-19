import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRejectedComponent } from './requests-rejected.component';

describe('RequestsRejectedComponent', () => {
  let component: RequestsRejectedComponent;
  let fixture: ComponentFixture<RequestsRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
