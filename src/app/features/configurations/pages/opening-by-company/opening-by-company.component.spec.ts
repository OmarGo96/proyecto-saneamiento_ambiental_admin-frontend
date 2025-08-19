import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningByCompanyComponent } from './opening-by-company.component';

describe('OpeningByCompanyComponent', () => {
  let component: OpeningByCompanyComponent;
  let fixture: ComponentFixture<OpeningByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpeningByCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
