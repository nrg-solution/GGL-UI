import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekersignupComponent } from './jobseekersignup.component';

describe('JobseekersignupComponent', () => {
  let component: JobseekersignupComponent;
  let fixture: ComponentFixture<JobseekersignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobseekersignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
