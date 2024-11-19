import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileCheckComponent } from './student-profile-check.component';

describe('StudentProfileCheckComponent', () => {
  let component: StudentProfileCheckComponent;
  let fixture: ComponentFixture<StudentProfileCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentProfileCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
