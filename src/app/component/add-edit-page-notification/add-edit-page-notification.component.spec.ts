import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPageNotificationComponent } from './add-edit-page-notification.component';

describe('AddEditPageNotificationComponent', () => {
  let component: AddEditPageNotificationComponent;
  let fixture: ComponentFixture<AddEditPageNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPageNotificationComponent]
    });
    fixture = TestBed.createComponent(AddEditPageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
