import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 导入 FormsModule
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/shared/service/web-socket.service';

interface Info {
  msg: string;
  who: string
}

@Component({
  selector: 'app-customer-chat',
  templateUrl: './customer-chat.component.html',
  styleUrls: ['./customer-chat.component.scss']
})
export class CustomerChatComponent {

  @Input() overOrder: string;
  @Input() userId: string;
  @Input() orderId: string;
  @Output() finish = new EventEmitter<string>();
  message: string;
  messages: Info[] = [];
  connectionTime: string;
  socketA: any

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.socketA = new WebSocket('ws://localhost:8080/MaasService/customerChat');

    // Event listener for WebSocket messages in Chat Room A
    this.socketA.addEventListener('message', (event) => {
      const message = event.data;
      if (message.includes('7Rm5nK9oPq')){
        this.orderFinish()
      }else if (message.startsWith('[driver]')) {
        this.messages.push({ msg: message.replace("[driver]", ""), who: 'driver' });
      }else {
        this.messages.push({ msg: message, who: 'customer' });
      }
    });

    // Event listener for WebSocket connection open in Chat Room A
    this.socketA.addEventListener('open', () => {
      this.connectionTime = new Date().toLocaleString();
    });
  }

  sendMessage(): void {
    if (this.message && this.message.trim() !== '') {
      this.messages.push({ msg: this.message, who: 'customer' });
      // this.messages.push(`${this.message}`);
      // const socketA = new WebSocket('ws://localhost:8080/MaasService/customerChat');
      this.socketA.send(this.message.trim());
      this.message = '';
    }
  }

  isOwnMessage(who: string): boolean {
    return who === 'customer';
  }

  ngOnChanges(changes: SimpleChanges) {
    // 当输入属性发生变化时被调用
    // changes 是一个对象，包含了变化前后的值
    // if (changes.overOrder && changes.overOrder.currentValue == "7Rm5nK9oPq") {
    //   this.http.post<any>('Cloud/arrived', { orderId: this.orderId, identity: 2 }).subscribe(data => {
    //     this.socketA.send(`7Rm5nK9oPq`);
    //   })
    // }
  }

  orderFinish(){
    this.finish.emit('7Rm5nK9oPq');
  }
}