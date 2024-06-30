import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDoComponent } from './add-to-do.component';

describe('AddToDoComponent', () => {
  let component: AddToDoComponent;
  let fixture: ComponentFixture<AddToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
