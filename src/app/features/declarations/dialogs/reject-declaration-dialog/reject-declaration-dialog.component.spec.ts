import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectDeclarationDialogComponent } from './reject-declaration-dialog.component';

describe('RejectDeclarationDialogComponent', () => {
  let component: RejectDeclarationDialogComponent;
  let fixture: ComponentFixture<RejectDeclarationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectDeclarationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectDeclarationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
