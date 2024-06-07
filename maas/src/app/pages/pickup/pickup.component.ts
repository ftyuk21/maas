import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { GoogleMap } from "@angular/google-maps";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Options } from "src/app/shared/model/option";
import { GoogleService } from "src/app/shared/service/google.service";
import { NotificationService } from "src/app/shared/service/notification.service";

@Component({
  selector: "app-pickup",
  templateUrl: "./pickup.component.html",
  styleUrls: ["./pickup.component.scss"],
})
export class PickupComponent implements OnInit {
  pickUpList$ = new BehaviorSubject<any[]>([]); // 查詢訂單列表
  pickUpList: [];

  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  constructor(public fb: UntypedFormBuilder, private route: ActivatedRoute, private router: Router,
    public http: HttpClient, public map: GoogleService,
    public msg: NotificationService, private cdr: ChangeDetectorRef) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: '#2828FF', // 
        strokeOpacity: 1.0, // 不透明度
        strokeWeight: 3 // 寬度
      }
    });
  }


  // ===========google map======================
  @ViewChild('googleMap') googleMap: GoogleMap;
  center: google.maps.LatLngLiteral; // 地圖中心點
  zoom = 15; // 縮放
  markers: {
    options: Options[];
    position: google.maps.LatLngLiteral[];
  } = { options: [], position: [] };

  ngOnInit(): void {
    this.getPickUpList()

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

  ngAfterViewInit() {
    // this.mapReady(this.order.startPlace, this.order.endPlace);
  }

  // 地圖載好後化路線
  mapReady(startPlace, endPlace) {
    this.directionsRenderer.setMap(this.googleMap.googleMap);
    this.calculateAndDisplayRoute(startPlace, endPlace);
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

  /**
   * 跳轉到訂單詳細頁面
   * @param id 
   */
  goToPickupDetail(id: any, pickUp: any) {
    this.setLocalStorage(pickUp)
    this.router.navigate(['/pickup/pickupdetail', id]);
  }

  /**
   * 取得訂單列表
   */
  getPickUpList() {
    this.http.get<any>("driver/available-bookings",).subscribe(data => {
      if (data.code == "0000") {
        // console.log(data)
        this.pickUpList$.next(data.data)
        // this.pickUpList = data.data.map(item => {
        //   let start
        //   let end;
        //   this.map.getCoordinates(item.startLocation).subscribe(d => {
        //     start = d.results[0].geometry.location
        //   })
        //   this.map.getCoordinates(item.destination).subscribe(d => {
        //     end = d.results[0].geometry.location
        //   })
        //   return {
        //     ...item,
        //     markers: {
        //       options:[
        //         {
        //           position: start,
        //           label: { color: "black", text: "起始", fontSize: '15px', fontWeight: 'bold', },
        //           title: "起始位置",
        //           options: { draggable: false }
        //         },
        //         {
        //           position: end,
        //           label: { color: "black", text: "目的", fontSize: '15px', fontWeight: 'bold', },
        //           title: "目的地",
        //           options: { draggable: false }
        //         },
        //       ],
        //       postions: [start, end]
        //     }
        //   }
        // })
      } else {
        this.msg.showError("無法取得可接訂單資料，請聯繫技術人員！")
      }
    })
  }

  /**
   * 設定地點
   */
  setGooglePostion(postion: Options) {
    this.markers.options.push(postion as Options)
    this.markers.position.push(postion.position)
    this.reloadMap(); // 設定好後重新加載地圖
  }

  // 重新加載地图
  reloadMap() {
    if (this.googleMap) {
      this.cdr.detectChanges(); // 手動觸發改變
    }
  }

  /**
   * 設定localstorage
   */
  setLocalStorage(pickUp: any) {
    localStorage.setItem('pickUpDetail', JSON.stringify(pickUp));
  }


}
