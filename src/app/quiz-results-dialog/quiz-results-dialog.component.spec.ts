import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultsDialogComponent } from './quiz-results-dialog.component';

describe('QuizResultsDialogComponent', () => {
  let component: QuizResultsDialogComponent;
  let fixture: ComponentFixture<QuizResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizResultsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
