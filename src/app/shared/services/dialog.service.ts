import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '@shared/models/dialog';
import { DialogOverviewComponent } from '@shared/components/dialog/dialog.component';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  dialogRef: MatDialogRef<DialogOverviewComponent>;

  public open(options: DialogData) {
    this.dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: options
    });
  }

  public confirmed(): Observable<DialogData> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
