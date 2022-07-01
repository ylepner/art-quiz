import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundResultsPageComponent } from './round-results-page.component';

describe('RoundResultsPageComponent', () => {
  let component: RoundResultsPageComponent;
  let fixture: ComponentFixture<RoundResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundResultsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
