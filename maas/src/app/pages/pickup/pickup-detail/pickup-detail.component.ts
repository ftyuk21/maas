import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WaitDialogComponent } from '../wait-dialog/wait-dialog.component';
import { GoogleService } from 'src/app/shared/service/google.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { GoogleMap } from "@angular/google-maps";
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

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
  id: any; // orderId
  customerId: number // 被查詢者Id
  comment: string[] = [];
  userId: number;

  map: google.maps.Map;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;



  routePoints: google.maps.LatLngLiteral[];

  progressBarCount;

  pickUpDetail= {}; // 訂單詳細資料

  pickUpDetail$ = new BehaviorSubject<any>("");

  latitude: number; // 緯度 當前位置
  longitude: number; // 經度 當前位置


  ratingsCount: any; // 評分人數
  ratingsValue: any; // 總分


  constructor(private route: ActivatedRoute,
    public http: HttpClient, public dialog: MatDialog, public google: GoogleService, private router: Router,
    public msg: NotificationService, private cdr: ChangeDetectorRef,private authService: AuthService) {
  }


  ngOnInit(): void {
    this.authService.userInfo$.subscribe(i => {
      if(i){
        this.userId = i.data.userId
      }
    })
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getPickUpDetail(this.id);
    });
  }


  accept() {
    this.http.post<any>("driver/getBooking", { userId:this.userId, orderId:this.id }).subscribe(data => {
      this.goBack();
    })
  }

  getPickUpDetail(orderId: number){
    this.http.get<any>("passenger/getOrder",{params:{orderId}}).subscribe(async data => {
      if (data.code == "0000") {
        this.pickUpDetail$.next(data.data)
        this.customerId = data.data.customerId;
        const startResult = await this.google.getCoordinates2(data.data.startLocation);
        const endResult = await this.google.getCoordinates2(data.data.destination);
        this.initializeMap(startResult, endResult)
        this.getCommentList(this.customerId, 1);
      } else {
        this.msg.showError("無法取得可接訂單資料，請聯繫技術人員！")
      }
    })
  }

  getCommentList(userId, identity){
    this.http.get<any>("Cloud/checkComment", { params: { userId, identity }}).subscribe(data => {
      if(data.data.length > 0){
        // this.comment = data.data.comment;
        data.data.forEach((item:any) => {
          // 將每個物件中的 comment 屬性加入到 this.comment 陣列中
          this.comment.push(item.customercomment);
        });
        this.ratingsCount = data.data.length;
        this.ratingsValue = data.data.reduce((acc, curr) => acc + curr.customerstar, 0);
        
        // 初始化一個包含五個元素的陣列，初始值為 0
        this.progressBarCount = Array.from({ length: 5 }, () => 0);

        // 遍歷 data.data 陣列中的每個物件
        data.data.forEach((item: any) => {
          // 取得評分，並將其轉換為數字
          const rating = item.customerstar;

          // 如果評分在合法範圍內（1 到 5 之間）
          if (rating >= 1 && rating <= 5) {
            // 增加相應評分的出現次數
            const index = 5 - Math.floor(rating);
            this.progressBarCount[index]++;
          }
        });
        
        // this.progressBarCount = Array.from({ length: 5 }, (_, i) => {
        //   const rating = 5 - i; // 從 5 開始遞減
        //   const count = data.data.customerstar.filter(comment => Math.floor(comment.rating) === rating).length;
        //   return count;
        // });
      } else if (data.data.length == 0){
        this.comment = [];
        this.ratingsCount = 0;
        this.ratingsValue = 5.0;
        // 初始化一個包含五個元素的陣列，初始值為 0
        this.progressBarCount = Array.from({ length: 5 }, () => 0);
        this.msg.showInfo("無評價", "");
      }else{
        this.msg.showInfo("評價取得異常，請聯繫技術人員","");
      }
    })
  }

  initializeMap(start, end) {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 23.897739340971725, lng: 121.54227420918299 },
      zoom: 15
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Add marker for start point
    const startPoint = new google.maps.Marker({
      position: { lat: start.results[0].geometry.location.lat, lng: start.results[0].geometry.location.lng }, // Replace START_LAT and START_LNG with your actual start point coordinates
      title: 'Start Point',
      label: 'Start' // Label for start point
    });

    // Add marker for end point
    const endPoint = new google.maps.Marker({
      position: { lat: end.results[0].geometry.location.lat, lng: end.results[0].geometry.location.lng }, // Replace END_LAT and END_LNG with your actual end point coordinates
      title: 'End Point',
      label: 'End' // Label for end point
    });

    // Add marker for current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // Set current position as map center
        this.map.setCenter(currentPosition);
        // Add marker for current position
        const currentPositionMarker = new google.maps.Marker({
          position: currentPosition,
          map: this.map,
          title: 'Your Current Position',
          label: 'Now' // Label for current position
        });

        this.setListener(currentPositionMarker, startPoint, endPoint)

        // Draw route between start and end points
        this.drawRoute(startPoint.getPosition(), endPoint.getPosition());
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  setListener(currentPositionMarker, startPoint, endPoint) {
    // Add click event listener to current position marker
    currentPositionMarker.addListener('click', () => {
      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: '你當前的位置'
      });
      // Open info window
      infoWindow.open(this.map, currentPositionMarker);
    });

    startPoint.addListener('click', () => {
      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: '你的上車地點'
      });
      // Open info window
      infoWindow.open(this.map, startPoint);
    });

    endPoint.addListener('click', () => {
      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: '你的目的地'
      });
      // Open info window
      infoWindow.open(this.map, endPoint);
    });
  }

  drawRoute(startPoint, endPoint) {
    // Draw route between start and end points
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);

    const request = {
      origin: startPoint,
      destination: endPoint,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Error fetching directions:', status);
      }
    });
  }


  goBack(){
    this.router.navigate(['pickup']);
  }
}
