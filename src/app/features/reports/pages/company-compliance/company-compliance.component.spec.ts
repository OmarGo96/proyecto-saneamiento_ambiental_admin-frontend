import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComplianceComponent } from './company-compliance.component';

describe('CompanyComplianceComponent', () => {
  let component: CompanyComplianceComponent;
  let fixture: ComponentFixture<CompanyComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
