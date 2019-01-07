import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementUpdateComponent } from './user-management-update.component';

describe('UserManagementUpdateComponent', () => {
  let component: UserManagementUpdateComponent;
  let fixture: ComponentFixture<UserManagementUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
