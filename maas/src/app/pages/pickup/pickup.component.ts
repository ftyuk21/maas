import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-pickup",
  templateUrl: "./pickup.component.html",
  styleUrls: ["./pickup.component.scss"],
})
export class PickupComponent implements OnInit {
  data: any[] = [];
  constructor(private router: Router,) {}

  

  center: google.maps.LatLngLiteral = { lat: 40.678178, lng: -73.944158 };
  zoom = 7;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 40.678178, lng: -73.944158 }
  ];

  ngOnInit(): void {
    this.data = [
      { id: 1, code: "1111111" },
      { id: 2, code: "2222222" },
      { id: 3, code: "3333333" },
      { id: 4, code: "4444444" },
      { id: 5, code: "5555555" },
      { id: 6, code: "6666666" },
      { id: 7, code: "7777777" },
    ];
  }

  goToPickupDetail(id: any){
    // console.log(id)
    this.router.navigate(['/pickup/pickupdetail', id]);
  }

  
}
