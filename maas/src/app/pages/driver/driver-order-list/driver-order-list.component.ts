import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ShowGoogleMapComponent } from '../../show-google-map/show-google-map.component';

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
    public authService: AuthService, public http: HttpClient, public dialog: MatDialog) { }
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
      if (data.data.driver.length > 0 ){
        this.orderList$.next(data.data.driver);
        // console.log(data.data.driver)
      }else{
        this.msg.showInfo("無訂單資料！")
      }
    })
  }

  nextToDetail(orderId: number){
    this.router.navigate(['customer/customer-order-detail',orderId]);
  }

  openDialog(start: string, end: string): void {
    const dialogRef = this.dialog.open(ShowGoogleMapComponent, {
      width: '70%',
      height: '70%',
      data: { start: start, end: end },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  goToOrderIng(orderId: number) {
    this.router.navigate(['driver/driver-ing', orderId]);
  }
}
