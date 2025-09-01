import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelMonthlyOccupancyComponent } from './hotel-monthly-occupancy.component';

describe('HotelMonthlyOccupancyComponent', () => {
  let component: HotelMonthlyOccupancyComponent;
  let fixture: ComponentFixture<HotelMonthlyOccupancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelMonthlyOccupancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelMonthlyOccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
