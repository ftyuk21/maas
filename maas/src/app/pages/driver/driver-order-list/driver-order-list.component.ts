import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-driver-order-list',
  templateUrl: './driver-order-list.component.html',
  styleUrls: ['./driver-order-list.component.scss']
})
export class DriverOrderListComponent {

  orderList$ = new BehaviorSubject<any[]>([]);
  userId: number = 0;


  constructor(private route: ActivatedRoute,
  private router: Router,public msg: NotificationService,
  public authService: AuthService, public http: HttpClient) { }
  // 自己加入 implements OnInit
  ngOnInit(): void {
    this.authService.userInfo$.subscribe(info => {
      if(info){
        this.getOrderList(info.data.userId)
      }
    })
  }

  getOrderList(userId: number){
    this.http.get<any>("passenger/checkOrder",{params: {userId}}).subscribe(data => {
      if(data.data.customer.length > 0 ){
        this.orderList$.next(data.data.driver);
        console.log(data.data.driver)
      }else{
        this.msg.showInfo("無訂單資料！")
      }
    })
  }

  nextToDetail(orderId: number){
    this.router.navigate(['customer/customer-order-detail',orderId]);
  }
}
