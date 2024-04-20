import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Upload Confirmation</h2>
    <mat-dialog-content
      >Are you sure you want to upload and update?</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `,
})
export class UploadConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UploadConfirmationDialogComponent>
  ) {}
}
