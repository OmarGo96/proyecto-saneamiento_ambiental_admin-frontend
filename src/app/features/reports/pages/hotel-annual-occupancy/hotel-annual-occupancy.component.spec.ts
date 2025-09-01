import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAnnualOccupancyComponent } from './hotel-annual-occupancy.component';

describe('HotelAnnualOccupancyComponent', () => {
  let component: HotelAnnualOccupancyComponent;
  let fixture: ComponentFixture<HotelAnnualOccupancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelAnnualOccupancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAnnualOccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
