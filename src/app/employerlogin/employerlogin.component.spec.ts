import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerloginComponent } from './employerlogin.component';

describe('EmployerloginComponent', () => {
  let component: EmployerloginComponent;
  let fixture: ComponentFixture<EmployerloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
