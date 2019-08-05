import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberunitstatusComponent } from './memberunitstatus.component';

describe('MemberunitstatusComponent', () => {
  let component: MemberunitstatusComponent;
  let fixture: ComponentFixture<MemberunitstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberunitstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberunitstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
