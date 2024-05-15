import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WaitDialogComponent } from '../wait-dialog/wait-dialog.component';
import { GoogleService } from 'src/app/shared/service/google.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { GoogleMap } from "@angular/google-maps";

function convertToLatLngLiteral(position: { lat: number, lng: number }): google.maps.LatLngLiteral {
  return { lat: position.lat, lng: position.lng };
}

export class Options {
  position: google.maps.LatLngLiteral;
  label: { color: string, text: string, fontSize: string, fontWeight: string };
  title: string;
  options: google.maps.MarkerOptions;
}
@Component({
  selector: 'app-pickup-detail',
  templateUrl: './pickup-detail.component.html',
  styleUrls: ['./pickup-detail.component.scss']
})
export class PickupDetailComponent implements OnInit {
  @ViewChild('googleMap') googleMap: GoogleMap;
  id: any;
  comment: {}[];

  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  progressBarCount;

  order = {
    orderId: 5,
    orderCode: "3578465",
    passengerRatingCount: 13,
    passengerRatingValue: 55,
    comment: [
      { passengerId: 3, passengerName: "CCC", rating: 4.5, comment: "乘客有禮貌" },
      { passengerId: 2, passengerName: "BBB", rating: 5, comment: "給小費" },
      { passengerId: 1, passengerName: "AAA", rating: 5, comment: "有小費" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2.5, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 3.4, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 5, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 1.7, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 5, comment: "態度很差" },
    ],
    time: "2024-05-14T12:30:00Z",
    startPlace: "974花蓮縣壽豐鄉理工二館",
    endPlace: "974花蓮縣壽豐鄉中正路1號"
  }

  latitude: number; // 緯度 當前位置
  longitude: number; // 經度 當前位置


  ratingsCount: any; // 評分人數
  ratingsValue: any; // 總分

  center: google.maps.LatLngLiteral; // 地圖中心點
  zoom = 15; // 縮放

  markers: {
    options: Options[];
    position: google.maps.LatLngLiteral[];
  } = { options: [], position: [] };

  test = "測試"

  constructor(private route: ActivatedRoute,
    public http: HttpClient, public dialog: MatDialog, public map: GoogleService,
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


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.comment = this.order.comment;
      this.ratingsCount = this.order.comment.length;
      this.ratingsValue = this.order.comment.reduce((total, comment) => total + comment.rating, 0);
      this.progressBarCount = Array.from({ length: 5 }, (_, i) => {
        const rating = 5 - i; // 從 5 開始遞減
        const count = this.order.comment.filter(comment => Math.floor(comment.rating) === rating).length;
        return count;
      });

      // this.getAndSetCoordinates(this.order.startPlace, "起始", "起始位置");
      // this.getAndSetCoordinates(this.order.endPlace, "目的", "目的地");

      // this.mapReady(this.order.startPlace, this.order.endPlace)

    });

    this.map.getLocation()
      .then(coords => {
        this.center = { lat: coords.latitude, lng: coords.longitude }
        const o = {
          position: { lat: coords.latitude, lng: coords.longitude },
          label: {
            color: "black", text: "當前", fontSize: '15px', fontWeight: 'bold',
          },
          title: "當前位置",
          options: { draggable: false },
        }
        this.setGooglePostion(o)
      })
      .catch(error => {
        this.msg.showError("取得當前位置錯誤，請聯繫技術人員！", "錯誤")
        console.error(error);
      });

  }

  ngAfterViewInit() {
    this.mapReady(this.order.startPlace, this.order.endPlace);
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

  accept() {
    this.http.get<any>("test/hello").subscribe(data => {
      console.log(data)
      const dialogRef = this.dialog.open(WaitDialogComponent, {
        width: '250px', // 設置寬度
        height: '250px', // 設置高度
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
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

}
