import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerheaderComponent } from './jobseekerheader.component';

describe('JobseekerheaderComponent', () => {
  let component: JobseekerheaderComponent;
  let fixture: ComponentFixture<JobseekerheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobseekerheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
