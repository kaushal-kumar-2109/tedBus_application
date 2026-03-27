import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDrawerComponent } from './form-drawer.component';

describe('FormDrawerComponent', () => {
  let component: FormDrawerComponent;
  let fixture: ComponentFixture<FormDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
