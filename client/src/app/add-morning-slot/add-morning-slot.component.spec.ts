import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMorningSlotComponent } from './add-morning-slot.component';

describe('AddMorningSlotComponent', () => {
  let component: AddMorningSlotComponent;
  let fixture: ComponentFixture<AddMorningSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMorningSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMorningSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
