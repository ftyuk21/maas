import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WaitDialogComponent } from '../wait-dialog/wait-dialog.component';
import { GoogleService } from 'src/app/shared/service/google.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

function convertToLatLngLiteral(position: { lat: number, lng: number }): google.maps.LatLngLiteral {
  return { lat: position.lat, lng: position.lng };
}
@Component({
  selector: 'app-pickup-detail',
  templateUrl: './pickup-detail.component.html',
  styleUrls: ['./pickup-detail.component.scss']
})
export class PickupDetailComponent implements OnInit {
  id: any;
  comment: {}[];

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
  markerOptions: google.maps.MarkerOptions; // 標記點(司機位置)
  startMarkerOptions: google.maps.MarkerOptions; // 標記點(起始位置)
  endMarkerOptions: google.maps.MarkerOptions; // 標記點(抵達位置)
  markerPositions: google.maps.LatLngLiteral[]; // 儲存點的陣列

  markers: {
    options: {
      position: google.maps.LatLngLiteral,
      label: { color: string, text: string },
      title: string,
      options: google.maps.MarkerOptions,
    }[];
    position: google.maps.LatLngLiteral[];
  }

  test = "測試"

  constructor(private route: ActivatedRoute,
    public http: HttpClient, public dialog: MatDialog, public map: GoogleService,
    public msg: NotificationService) { }


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

      this.map.getCoordinates(this.order.startPlace).subscribe(data => {
        const driverPosition: google.maps.LatLngLiteral = { lat: this.latitude, lng: this.longitude };
        this.startMarkerOptions = {
          position: driverPosition,
          label: '您的所在地' // 標籤
        };
      })

      this.map.getCoordinates(this.order.endPlace).subscribe(data => {
        if (data.status == 'OK') {
          // const endPosition: google.maps.LatLngLiteral = data.results.location;
          this.endMarkerOptions = {
            position: data.results.location,
            label: '乘客目的地' // 標籤
          };
        }
        console.log(data)

      })

    });

    this.map.getLocation()
      .then(coords => {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        this.setGooglePostion();
      })
      .catch(error => {
        this.msg.showError("取得當前位置錯誤，請聯繫技術人員！", "錯誤")
        console.error(error);
      });

  }

  setGooglePostion() {
    this.center = { lat: this.latitude, lng: this.longitude };
    this.markerOptions = { draggable: false };
    this.startMarkerOptions = { draggable: false };
    this.endMarkerOptions = { draggable: false };
    this.markerPositions = [
      { lat: this.latitude, lng: this.longitude }, // 當前位置
      { lat: this.latitude + 0.05, lng: this.longitude }, // 起始位置
      { lat: this.latitude + 0.06, lng: this.longitude }, // 結束位置
    ];

    this.markers = {
      options: [
        {
          position: convertToLatLngLiteral({ lat: this.latitude, lng: this.longitude }),
          label: { color: 'red', text: '您的當前位置 ' },
          title: '當前位置',
          options: { draggable: false },
        },
        {
          position: convertToLatLngLiteral({ lat: this.latitude, lng: this.longitude }),
          label: { color: 'red', text: '您的當前位置 ' },
          title: '當前位置',
          options: { draggable: false },
        },
      ],
      position: [
        { lat: this.latitude, lng: this.longitude }, // 當前位置
        { lat: this.latitude + 0.05, lng: this.longitude }, // 起始位置
        { lat: this.latitude + 0.06, lng: this.longitude }, // 結束位置
      ]
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

}
