import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberWithdraw;Component } from './member-withdraw;.component';

describe('MemberWithdraw;Component', () => {
  let component: MemberWithdraw;Component;
  let fixture: ComponentFixture<MemberWithdraw;Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberWithdraw;Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberWithdraw;Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
