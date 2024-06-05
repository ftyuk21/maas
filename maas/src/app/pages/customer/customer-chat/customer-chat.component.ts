import { Component, Input } from '@angular/core';
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
  message: string;
  messages: Info[] = [];
  connectionTime: string;
  socketA: any

  constructor() { }

  ngOnInit(): void {
    this.socketA = new WebSocket('ws://localhost:8080/MaasService/customerChat');

    // Event listener for WebSocket messages in Chat Room A
    this.socketA.addEventListener('message', (event) => {
      const message = event.data;
      if (message.startsWith('[driver]')){
        this.messages.push({ msg: message.replace("[driver]", ""), who: 'driver' });
      }else{
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
}
