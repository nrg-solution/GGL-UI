import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPurchaseunitComponent } from './member-purchaseunit.component';

describe('MemberPurchaseunitComponent', () => {
  let component: MemberPurchaseunitComponent;
  let fixture: ComponentFixture<MemberPurchaseunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPurchaseunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPurchaseunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
