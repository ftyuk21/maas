import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service'
import { NotificationService } from 'src/app/shared/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  userInfo$: any = this.authService.userInfo$.asObservable();

  agreeCount$: any = new BehaviorSubject<any>(null);

  constructor(private route: ActivatedRoute,
    private router: Router, public msg: NotificationService,
    public authService: AuthService, public http: HttpClient) { }

  ngOnInit(): void { 
    if(this.authService.isLoggedIn()){
      this.authService.userInfo$.subscribe(info => {
        if(info == null){
          this.authService.getUserInfo();
        }else{
          this.getAgreeCount(info.data.userId)
        }
        
      })
    }else{
    }
  }

  openMegaMenu() {
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
      if (el.children.length > 0) {
        if (el.children[0].classList.contains('mega-menu')) {
          el.classList.add('mega-menu-pane');
        }
      }
    });
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }

  /**
   * @param type 11:乘客歷史訂單紀錄 12:乘客下訂單 21:司機歷史訂單紀錄 22:司機接單列表
   */
  nextPage(type: number) {
    if(type == 11){
      // 歷史訂單
      this.router.navigate(['/customer/customer-order-list']);
    }else if(type == 12){
      this.router.navigate(['/ordering']);
    }else if(type == 21){
      // 歷史訂單 司機
      this.router.navigate(['/driver/driver-order-list']);
    }else if(type == 22){
      this.router.navigate(['/pickup']);
    }
  }

  getAgreeCount(userId: number){
    this.http.get<any>('fixed/getOrderAgreeListCount',{params:{userId: userId}}).subscribe(data => {
      this.agreeCount$.next(data.data)
    })
  }

  goToAgree(){
    this.router.navigate(['agree/agree-list']);
  }
}
