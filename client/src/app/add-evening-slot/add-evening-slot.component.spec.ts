import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEveningSlotComponent } from './add-evening-slot.component';

describe('AddEveningSlotComponent', () => {
  let component: AddEveningSlotComponent;
  let fixture: ComponentFixture<AddEveningSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEveningSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEveningSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
