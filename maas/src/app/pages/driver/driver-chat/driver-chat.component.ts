import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, identity } from 'rxjs';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { WebSocketService } from 'src/app/shared/service/web-socket.service';
import { CommentDialogComponent } from '../../comment-dialog/comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface Info {
  msg: string;
  who: string
}

@Component({
  selector: 'app-driver-chat',
  templateUrl: './driver-chat.component.html',
  styleUrls: ['./driver-chat.component.scss']
})
export class DriverChatComponent {
  @Input() overOrder: string;
  @Input() userId: string;
  @Input() orderId: string;
  @Output() overOrderEvent = new EventEmitter<string>();
  message: string;
  messages: Info[] = [];
  connectionTime: string;
  socketB: any

  constructor(public http: HttpClient, private router: Router, 
    public msg: NotificationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.socketB = new WebSocket('ws://localhost:8080/MaasService/driverChat');

    // Event listener for WebSocket messages in Chat Room B
    this.socketB.addEventListener('message', (event) => {
      const message = event.data;
      if (message.startsWith('[customer]')) {
        this.messages.push({ msg: message.replace("[customer]", ""), who: 'customer' });
      } else {
        this.messages.push({ msg: message, who: 'driver' });
      }
    });

    // Event listener for WebSocket connection open in Chat Room B
    this.socketB.addEventListener('open', () => {
      this.connectionTime = new Date().toLocaleString();
    });
  }

  sendMessage(): void {
    if (this.message && this.message.trim() !== '') {
      this.messages.push({ msg: this.message, who: 'driver' });
      // const socketB = new WebSocket('ws://localhost:8080/MaasService/driverChat');
      this.socketB.send(this.message.trim());
      this.message = '';
    }
  }

  isOwnMessage(who: string): boolean {
    return who === 'driver';
  }

  ngOnChanges(changes: SimpleChanges) {
    // 当输入属性发生变化时被调用
    // changes 是一个对象，包含了变化前后的值
    if (changes.overOrder && changes.overOrder.currentValue == "7Rm5nK9oPq"){
      this.http.post<any>('Cloud/arrived', { orderId: this.orderId, identity: 2 }).subscribe(data => {
        this.socketB.send(`7Rm5nK9oPq`);
        this.openDialog();
      })
    }
  }

  openDialog(){

    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '20%',
      data: { comment: "", star: "", identity:  2},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.http.post<any>('Cloud/comment', { orderId: this.orderId, userId: this.userId, comment: result.comment, star: result.star, identity: 2}).subscribe(data => {
        this.msg.showSuccess("評論成功");
        this.router.navigate(['driver/driver-order-list']);
      })
    });

  }
}
