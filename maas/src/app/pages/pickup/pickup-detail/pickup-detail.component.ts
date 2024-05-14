import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WaitDialogComponent } from '../wait-dialog/wait-dialog.component';

@Component({
  selector: 'app-pickup-detail',
  templateUrl: './pickup-detail.component.html',
  styleUrls: ['./pickup-detail.component.scss']
})
export class PickupDetailComponent implements OnInit {
  id: any;
  comment:{}[];

  progressBarCount;

  order = {
    orderId: 5,
    orderCode: "3578465",
    passengerRatingCount: 13, 
    passengerRatingValue: 55,
    comment: [
      { passengerId: 3, passengerName: "CCC", rating: 4.5 , comment :"乘客有禮貌"},
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
    startPlace: "XXXXXXXXXXXXXXXXXXXXX",
    endPlace: "XXXXXXXXXXXXXXXXXXXXX"
  }


  ratingsCount: any; // 評分人數
  ratingsValue: any; // 總分

  center: google.maps.LatLngLiteral = { lat: 40.678178, lng: -73.944158 };
  zoom = 7;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 40.678178, lng: -73.944158 }
  ];
  constructor(private route: ActivatedRoute, public http: HttpClient, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.comment = this.order.comment;
      this.ratingsCount = this.order.comment.length;
      this.ratingsValue = this.order.comment.reduce((total, comment) => total + comment.rating, 0);
      this.progressBarCount = Array.from({ length: 5 }, (_, i) => {
        console.log(i)
        const rating = 5 - i; // 從 5 開始遞減
        const count = this.order.comment.filter(comment => Math.floor(comment.rating) === rating).length;
        return count;
      });
      console.log(this.progressBarCount)
    });
  }

  accept(){
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
