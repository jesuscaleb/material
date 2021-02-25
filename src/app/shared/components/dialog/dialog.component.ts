import { ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '@shared/models/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  close(val : boolean) {
    this.dialogRef.close(val);
  }

  confirm(){
    this.close(true)
  }

  cancel(){
    this.close(false)
  }
  
  @HostListener("keydown.esc") 
  onEsc() {
    this.close(false);
  }

}
