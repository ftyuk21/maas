import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{
  constructor(private snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) private snackBarData: any) {}

  icon: string = "error_outline";
  ngOnInit() {
    // console.log(this.snackBarData)
    switch(this.type){
      case 1:
        this.icon = "check_circle_outline";
        break;
      case 2:
        this.icon = "highlight_off";
        break;
      case 3:
      case 5:
        this.icon = "error_outline";
        break;
      case 4:
        this.icon = "info_outline";
        break;
    }
  }

  closeSnackBar() {
    this.snackBar.dismiss();
  }

  get title() {
    return this.snackBarData.title;
  }

  get message(){
    return this.snackBarData.message;
  }

  get type(){
    return this.snackBarData.type;
  }
}
