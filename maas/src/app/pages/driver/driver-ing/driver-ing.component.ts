import { Options } from 'src/app/shared/model/option';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/service/auth.service'
import { NotificationService } from 'src/app/shared/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { GoogleService } from '../../../shared/service/google.service'

@Component({
  selector: 'app-driver-ing',
  templateUrl: './driver-ing.component.html',
  styleUrls: ['./driver-ing.component.scss']
})
export class DriverIngComponent {

  start: google.maps.LatLngLiteral;
  end: google.maps.LatLngLiteral;

  order$ = new BehaviorSubject<any>("");

  // 地圖
  center: google.maps.LatLngLiteral; // 地圖中心點
  zoom = 15; // 縮放

  map: google.maps.Map;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  // center: google.maps.LatLngLiteral; // 地圖中心點
  // zoom = 15; // 縮放

  // markers: {
  //   options: Options[];
  //   position: google.maps.LatLngLiteral[];
  // } = { options: [], position: [] };

  constructor(private route: ActivatedRoute,
    private router: Router, public msg: NotificationService,
    public authService: AuthService, public http: HttpClient, public googleService: GoogleService) { }
  // 自己加入 implements OnInit

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['orderId']; // 获取路由参数
      this.getOrderDetail(id)
    });

  }

  getOrderDetail(orderId: number) {
    this.http.get<any>('passenger/getOrder', { params: { orderId } }).subscribe(async data => {
      this.order$.next(data.data)
      const startResult = await this.googleService.getCoordinates2(data.data.startLocation);
      const endResult = await this.googleService.getCoordinates2(data.data.destination);
      this.initializeMap(startResult, endResult)
      // this.startP = data.data.startLocation;
      // this.endP = data.data.destination;
      // this.calculateAndDisplayRoute(data.data.startLocation, data.data.destination)
      // this.mapReady(data.data.startLocation,data.data.destination)
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
      map: this.map,
      title: 'Start Point',
      label: 'Start' // Label for start point
    });

    // Add marker for end point
    const endPoint = new google.maps.Marker({
      position: { lat: end.results[0].geometry.location.lat, lng: end.results[0].geometry.location.lng }, // Replace END_LAT and END_LNG with your actual end point coordinates
      map: this.map,
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
}
