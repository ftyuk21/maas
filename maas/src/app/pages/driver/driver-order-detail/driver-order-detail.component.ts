import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/service/auth.service'
import { NotificationService } from 'src/app/shared/service/notification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-driver-order-detail',
  templateUrl: './driver-order-detail.component.html',
  styleUrls: ['./driver-order-detail.component.scss']
})
export class DriverOrderDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,
  private router: Router,public msg: NotificationService,
  public authService: AuthService, public http: HttpClient) { }
  
  // 自己加入 implements OnInit
  ngOnInit(): void {
    
    // this.map.getLocation()
    //   .then(coords => {
    //     this.center = { lat: coords.latitude, lng: coords.longitude }
    //     const o = {
    //       position: { lat: coords.latitude, lng: coords.longitude },
    //       label: {
    //         color: "black", text: "當前", fontSize: '15px', fontWeight: 'bold',
    //       },
    //       title: "當前位置",
    //       options: { draggable: false },
    //     }
    //     this.setGooglePostion(o)
    //   })
    //   .catch(error => {
    //     this.msg.showError("取得當前位置錯誤，請聯繫技術人員！", "錯誤")
    //     console.error(error);
    //   });
  }

  getOrderDetail(orderId: number){
    this.http.get<any>('passenger/getOrder',{params:{orderId}}).subscribe(data => {
      console.log(data)
    })
  }


  // getAndSetCoordinates(place: string, label: string, title: string) {
  //   this.map.getCoordinates(place).subscribe(data => {
  //     if (data.status == "OK") {
  //       const o = {
  //         position: data.results[0].geometry.location,
  //         label: {
  //           color: "black", text: label, fontSize: '15px', fontWeight: 'bold',
  //         },
  //         title: title,
  //         options: { draggable: false },
  //       };
  //       this.setGooglePostion(o);
  //     } else {
  //       this.msg.showError('訂單取得不成功，請聯繫技術人員！');
  //     }
  //   });
  // }

  // ngAfterViewInit() {
  //   this.mapReady(this.order.startPlace, this.order.endPlace);
  // }

  // setGooglePostion(postion: Options) {
  //   this.markers.options.push(postion as Options)
  //   this.markers.position.push(postion.position)
  //   // console.log(this.markers)
  //   this.reloadMap()
  // }

  // // 重新加载地图
  // reloadMap() {
  //   if (this.googleMap) {
  //     // 调用 ChangeDetectorRef 的 detectChanges 方法手动触发变化检测
  //     this.cdr.detectChanges();
  //   }
  // }



  // // 地圖載好後化路線
  // mapReady(startPlace, endPlace) {
  //   this.directionsRenderer.setMap(this.googleMap.googleMap);
  //   this.calculateAndDisplayRoute(startPlace, endPlace);
  // }

  // // 計算並顯示路線
  // calculateAndDisplayRoute(startPlace, endPlace) {
  //   const start = startPlace; // 起
  //   const end = endPlace; // 終點
  //   const request = {
  //     origin: start,
  //     destination: end,
  //     travelMode: google.maps.TravelMode.DRIVING // 設為駕駛模式
  //   };
  //   this.directionsService.route(request, (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.directionsRenderer.setDirections(result);
  //     }
  //   });
  // }

  // getLocalStorage() {
  //   const value = localStorage.getItem('pickUpDetail');
  //   this.pickUpDetail = JSON.parse(value)
  // }
}
