import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoogleMap, MapMarker} from '@angular/google-maps';
// import { google } from '@google/maps';

export interface DialogData {
  start: string;
  end: string;
}

@Component({
  selector: 'app-show-google-map',
  templateUrl: './show-google-map.component.html',
  styleUrls: ['./show-google-map.component.scss']
})
export class ShowGoogleMapComponent {

  // center: google.maps.LatLngLiteral; // 地圖中心點
  // zoom = 15; // 縮放

  map: google.maps.Map;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  
  
  routePoints: google.maps.LatLngLiteral[];
  
  constructor(
    public dialogRef: MatDialogRef<ShowGoogleMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(){
    // this.routePoints = [
    //   { lat: 40.712776, lng: -74.005974 }, // Example route point 1
    //   { lat: 34.052235, lng: -118.243683 } // Example route point 2
    // ];

    this.initializeMap();
  }

  


  onNoClick(): void {
    this.dialogRef.close();
  }


  initializeMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 23.897739340971725, lng: 121.54227420918299 },
      zoom: 10
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    this.directionsRenderer.setMap(this.map);
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    const request: google.maps.DirectionsRequest = {
      origin: this.data.start,
      destination: this.data.end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
