import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberpaymentuploadComponent } from './memberpaymentupload.component';

describe('MemberpaymentuploadComponent', () => {
  let component: MemberpaymentuploadComponent;
  let fixture: ComponentFixture<MemberpaymentuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberpaymentuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberpaymentuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
