import { Component } from '@angular/core';
import { Options } from 'src/app/shared/model/option';

@Component({
  selector: 'app-customer-ing',
  templateUrl: './customer-ing.component.html',
  styleUrls: ['./customer-ing.component.scss']
})
export class CustomerIngComponent {
  center: google.maps.LatLngLiteral; // 地圖中心點
  zoom = 15; // 縮放

  markers: {
    options: Options[];
    position: google.maps.LatLngLiteral[];
  } = { options: [], position: [] };
}
