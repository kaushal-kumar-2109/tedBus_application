import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusBookingFormComponent } from './bus-booking-form.component';

describe('BusBookingFormComponent', () => {
  let component: BusBookingFormComponent;
  let fixture: ComponentFixture<BusBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusBookingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
