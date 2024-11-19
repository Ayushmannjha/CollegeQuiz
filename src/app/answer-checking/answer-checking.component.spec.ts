import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCheckingComponent } from './answer-checking.component';

describe('AnswerCheckingComponent', () => {
  let component: AnswerCheckingComponent;
  let fixture: ComponentFixture<AnswerCheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswerCheckingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
