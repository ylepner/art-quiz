import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPicturesPageComponent } from './quiz-pictures-page.component';

describe('QuizPicturesPageComponent', () => {
  let component: QuizPicturesPageComponent;
  let fixture: ComponentFixture<QuizPicturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizPicturesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizPicturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
