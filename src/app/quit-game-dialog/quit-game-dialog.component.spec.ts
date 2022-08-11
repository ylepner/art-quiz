import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitGameDialogComponent } from './quit-game-dialog.component';

describe('QuitGameDialogComponent', () => {
  let component: QuitGameDialogComponent;
  let fixture: ComponentFixture<QuitGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitGameDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuitGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
