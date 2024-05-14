import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * 成功
   * @param message 內文
   * @param title  標題
   */
  showSuccess(message, title = '成功') {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: { message: message, title: title, type:1 }
    })
  }


  /**
   * 錯誤
   * @param message 內文
   * @param title  標題
   */
  showError(message, title = '錯誤') {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: { message: message, title: title, type: 2}
    })
  }

  /**
   * 資訊
   * @param message 內文
   * @param title  標題
   */
  showInfo(message, title = '資訊') {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: { message: message, title: title, type: 3}
    })
  }

  /**
   * 警告
   * @param message 內文
   * @param title  標題
   */
  showWarning(message, title = '警告') {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: { message: message, title: title, type: 4}
    })
  }

  /**
  * 錯誤(針對庫存)
  * @param message 內文
  * @param title  標題
  */
  showErrorForControll(message, title) {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: message, title: title, type: 5 }
    })
  }
}
