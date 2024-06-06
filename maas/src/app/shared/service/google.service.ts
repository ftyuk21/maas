import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  
  private apiKey = 'AIzaSyAj8SkD0VNVv7ld0fi1dinSZ5yP1-RzoDE';

  constructor(private http: HttpClient) { }

  /**
   * 取得使用者當前位置
   */
  getLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  /**
   * 地址賺換為經緯度
   * @param address 
   * @returns 
   */
  getCoordinates(address: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  /**
   * 地址賺換為經緯度2
   * @param address 
   * @returns 
   */
  getCoordinates2(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }

  /**
   * 經緯度轉為地址
   * @param latitude 
   * @param longitude 
   * @returns 
   */
  getAddress(latitude: number, longitude: number): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  /**
   * 取得點到點之間的路線
   */
  getRoute(origin: string, destination: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
