import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerifyResultComponent } from './admin-verify-result.component';

describe('AdminVerifyResultComponent', () => {
  let component: AdminVerifyResultComponent;
  let fixture: ComponentFixture<AdminVerifyResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVerifyResultComponent]
    });
    fixture = TestBed.createComponent(AdminVerifyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
