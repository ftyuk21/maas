import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private customerSocket$: WebSocketSubject<any>;
  private driverSocket$: WebSocketSubject<any>;

  constructor() {
    this.customerSocket$ = webSocket('ws://localhost:8080/MaasService/customerChat');
    this.driverSocket$ = webSocket('ws://localhost:8080/MaasService/driverChat');
  }

  customerSend(message: any): void {
    this.customerSocket$.next(message);
  }

  driverSend(message: any): void {
    this.driverSocket$.next(message);
  }

  onCustomerMessage() {
    return this.customerSocket$.asObservable();
  }

  onDriverMessage() {
    return this.driverSocket$.asObservable();
  }

  // 關閉 WebSocket 連接
  closeCustomerConnection(): void {
    this.customerSocket$.complete();
  }

  // 關閉 WebSocket 連接
  closeDriverConnection(): void {
    this.driverSocket$.complete();
  }
}
