import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerhomeComponent } from './employerhome.component';

describe('EmployerhomeComponent', () => {
  let component: EmployerhomeComponent;
  let fixture: ComponentFixture<EmployerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
