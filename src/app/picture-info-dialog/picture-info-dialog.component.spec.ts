import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureInfoDialogComponent } from './picture-info-dialog.component';

describe('PictureInfoDialogComponent', () => {
  let component: PictureInfoDialogComponent;
  let fixture: ComponentFixture<PictureInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
