import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/shared/service/web-socket.service';

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
  message: string;
  messages: Info[] = [];
  connectionTime: string;
  socketB: any

  constructor() { }

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
}
