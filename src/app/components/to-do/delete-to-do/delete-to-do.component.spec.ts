import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToDoComponent } from './delete-to-do.component';

describe('DeleteToDoComponent', () => {
  let component: DeleteToDoComponent;
  let fixture: ComponentFixture<DeleteToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteToDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
