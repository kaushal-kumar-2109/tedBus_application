import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectbusPageComponent } from './selectbus-page.component';

describe('SelectbusPageComponent', () => {
  let component: SelectbusPageComponent;
  let fixture: ComponentFixture<SelectbusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectbusPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectbusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
