import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElementComponent } from './edit-element.component';

describe('EditElementComponent', () => {
  let component: EditElementComponent;
  let fixture: ComponentFixture<EditElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
