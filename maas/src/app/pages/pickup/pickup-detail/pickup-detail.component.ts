import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pickup-detail',
  templateUrl: './pickup-detail.component.html',
  styleUrls: ['./pickup-detail.component.scss']
})
export class PickupDetailComponent implements OnInit {
  id: any;
  comment:{}[];

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
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
      { passengerId: 4, passengerName: "DDD", rating: 2, comment: "態度很差" },
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
  constructor(private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.comment = this.order.comment;
      this.ratingsCount = this.order.comment.length;
      this.ratingsValue = this.order.comment.reduce((total, comment) => total + comment.rating, 0);
    });
  }

}
