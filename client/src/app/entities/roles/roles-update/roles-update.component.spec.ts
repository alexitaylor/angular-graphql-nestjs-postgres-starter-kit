import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUpdateComponent } from './roles-update.component';

describe('RolesUpdateComponent', () => {
  let component: RolesUpdateComponent;
  let fixture: ComponentFixture<RolesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
