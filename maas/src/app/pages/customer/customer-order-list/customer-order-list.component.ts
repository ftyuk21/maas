import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/service/auth.service'
import { NotificationService } from 'src/app/shared/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { ShowGoogleMapComponent } from '../../show-google-map/show-google-map.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.scss']
})
export class CustomerOrderListComponent implements OnInit {

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
      if(data.data.customer.length > 0 ){
        this.orderList$.next(data.data.customer);
      }else{
        this.msg.showInfo("無訂單資料！")
      }
    })
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

  goToOrderIng(orderId: number){
    this.router.navigate(['customer/customer-ing', orderId]);
  }


}



// [
//   {
//       "orderId": 16,
//       "pickupTime": "2024-06-14T15:19:00.000+00:00",
//       "destination": "974花蓮縣壽豐鄉豐坪路三段1411巷165弄16號",
//       "startLocation": "974花蓮縣壽豐鄉中正路261巷48號",
//       "priceRangeUp": 100,
//       "priceRangeDown": 5,
//       "driverId": null,
//       "customerId": 15,
//       "orderCode": "ORD4841374",
//       "statusCode": 2,
//       "drivercomment": null,
//       "customercomment": null,
//       "driverstar": null,
//       "customerstar": null
//   }
// ]