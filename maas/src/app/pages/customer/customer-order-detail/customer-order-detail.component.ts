import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/service/auth.service'
import { NotificationService } from 'src/app/shared/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { GoogleMap } from '@angular/google-maps';
import { Options } from '../../ordering/ordering.component';
import { GoogleService } from 'src/app/shared/service/google.service';

@Component({
  selector: 'app-customer-order-detail',
  templateUrl: './customer-order-detail.component.html',
  styleUrls: ['./customer-order-detail.component.scss']
})
export class CustomerOrderDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router, public msg: NotificationService,
    public authService: AuthService, public http: HttpClient, private cdr: ChangeDetectorRef, public map: GoogleService) {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#2828FF', // 
          strokeOpacity: 1.0, // 不透明度
          strokeWeight: 3 // 寬度
        }
      });
    }


  @ViewChild('googleMap') googleMap: GoogleMap;


  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  order$ = new BehaviorSubject<any>("");
  order = {};

  latitude: number; // 緯度 當前位置
  longitude: number; // 經度 當前位置


  center: google.maps.LatLngLiteral; // 地圖中心點
  zoom = 15; // 縮放

  startP: any;
  endP:any;

  markers: {
    options: Options[];
    position: google.maps.LatLngLiteral[];
  } = { options: [], position: [] };

  // 自己加入 implements OnInit
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['orderId']; // 获取路由参数
      this.getOrderDetail(id)
    });


    this.map.getLocation()
      .then(coords => {
        this.center = { lat: coords.latitude, lng: coords.longitude }
        // const o = {
        //   position: { lat: coords.latitude, lng: coords.longitude },
        //   label: {
        //     color: "black", text: "當前", fontSize: '15px', fontWeight: 'bold',
        //   },
        //   title: "當前位置",
        //   options: { draggable: false },
        // }
        // this.setGooglePostion(o)
      })
      .catch(error => {
        this.msg.showError("取得當前位置錯誤，請聯繫技術人員！", "錯誤")
        console.error(error);
      });

  }

  getOrderDetail(orderId: number) {
    this.http.get<any>('passenger/getOrder', { params: { orderId } }).subscribe(data => {
      this.order$.next(data.data)
      this.startP = data.data.startLocation;
      this.endP = data.data.destination;
      this.calculateAndDisplayRoute(data.data.startLocation,data.data.destination)
      // this.mapReady(data.data.startLocation,data.data.destination)
    })
  }


  getAndSetCoordinates(place: string, label: string, title: string) {
    this.map.getCoordinates(place).subscribe(data => {
      if (data.status == "OK") {
        const o = {
          position: data.results[0].geometry.location,
          label: {
            color: "black", text: label, fontSize: '15px', fontWeight: 'bold',
          },
          title: title,
          options: { draggable: false },
        };
        this.setGooglePostion(o);
      } else {
        this.msg.showError('訂單取得不成功，請聯繫技術人員！');
      }
    });
  }

  ngAfterViewInit() {
    this.order$.subscribe(data => {
      if(data.data){
        this.mapReady(data.startLocation, data.destination);
      }
    })
  }

  setGooglePostion(postion: Options) {
    this.markers.options.push(postion as Options)
    this.markers.position.push(postion.position)
    // console.log(this.markers)
    this.reloadMap()
  }

  // 重新加载地图
  reloadMap() {
    if (this.googleMap) {
      // 调用 ChangeDetectorRef 的 detectChanges 方法手动触发变化检测
      this.cdr.detectChanges();
    }
  }



  // 地圖載好後化路線
  mapReady(startPlace, endPlace) {
    this.directionsRenderer.setMap(this.googleMap.googleMap);
    this.calculateAndDisplayRoute(startPlace, endPlace);
    this.reloadMap()
  }

  // 計算並顯示路線
  calculateAndDisplayRoute(startPlace, endPlace) {
    const start = startPlace; // 起
    const end = endPlace; // 終點
    const request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING // 設為駕駛模式
    };
    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      }
    });
  }

  // getLocalStorage() {
  //   const value = localStorage.getItem('pickUpDetail');
  //   this.pickUpDetail = JSON.parse(value)
  // }
}
