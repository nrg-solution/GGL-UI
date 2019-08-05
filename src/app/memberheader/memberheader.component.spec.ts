import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberheaderComponent } from './memberheader.component';

describe('MemberheaderComponent', () => {
  let component: MemberheaderComponent;
  let fixture: ComponentFixture<MemberheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
