import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/service/auth.service'
import { NotificationService } from 'src/app/shared/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { Data } from 'src/app/app.service';

@Component({
  selector: 'app-agree-list',
  templateUrl: './agree-list.component.html',
  styleUrls: ['./agree-list.component.scss']
})
export class AgreeListComponent implements OnInit {

  orderList$ = new BehaviorSubject<any[]>([]);
  userId: number = 0;

  constructor(private route: ActivatedRoute,
  private router: Router,public msg: NotificationService,
  public authService: AuthService, public http: HttpClient) { }
  // 自己加入 implements OnInit
  ngOnInit(): void {
    this.authService.userInfo$.subscribe(info => {
      if(info){
        this.getAgreeList(info.data.userId);
      }
    })

  }

  getAgreeList(userId: number){
    this.http.get<any>("fixed/getOrderAgreeList", { params: { userId } }).subscribe(data => {
      if (data && data.data.length > 0) {
        this.orderList$.next(data.data);
      } else {
        this.msg.showInfo("無待回復訂單資料！")
      }
    })
  }

  goDetail(orderId: number){
    this.router.navigate(['/agree/agree-detail', orderId]);
  }
}
