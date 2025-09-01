import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementsByCompanyComponent } from './statements-by-company.component';

describe('StatementsByCompanyComponent', () => {
  let component: StatementsByCompanyComponent;
  let fixture: ComponentFixture<StatementsByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementsByCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementsByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
