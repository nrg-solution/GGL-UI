import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerhomeComponent } from './jobseekerhome.component';

describe('JobseekerhomeComponent', () => {
  let component: JobseekerhomeComponent;
  let fixture: ComponentFixture<JobseekerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobseekerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
