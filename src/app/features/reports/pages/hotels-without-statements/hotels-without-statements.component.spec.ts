import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsWithoutStatementsComponent } from './hotels-without-statements.component';

describe('HotelsWithoutStatementsComponent', () => {
  let component: HotelsWithoutStatementsComponent;
  let fixture: ComponentFixture<HotelsWithoutStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsWithoutStatementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsWithoutStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
