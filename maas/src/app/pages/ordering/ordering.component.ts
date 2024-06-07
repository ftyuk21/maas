import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { GoogleMap } from "@angular/google-maps";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/shared/service/auth.service";
import { GoogleService } from "src/app/shared/service/google.service";
import { NotificationService } from "src/app/shared/service/notification.service";

function convertToLatLngLiteral(position: { lat: number, lng: number }): google.maps.LatLngLiteral {
  return { lat: position.lat, lng: position.lng };
}

export class Options {
  position: google.maps.LatLngLiteral;
  label: { color: string, text: string, fontSize: string, fontWeight: string };
  title: string;
  options: google.maps.MarkerOptions;
  // icon: {
  //   url: string, // icon URL
  //   scaledSize: google.maps.Size; // 尺寸(32, 32)
  //   origin: google.maps.Point; // 原點(0, 0)
  //   anchor: google.maps.Point; // 錨點(16, 16)
  // };

}

@Component({
  selector: "app-ordering",
  templateUrl: "./ordering.component.html",
  styleUrls: ["./ordering.component.scss"],
})
export class OrderingComponent implements OnInit {
  orderForm: UntypedFormGroup; // form
  userInfo: any = {}; // 定義 物件

  center: google.maps.LatLngLiteral; // 地圖中心點
  zoom = 15; // 縮放
  markers: {
    options: Options[];
    position: google.maps.LatLngLiteral[];
  } = { options: [], position: [] };

  @ViewChild('googleMap') googleMap: GoogleMap;

  constructor(public fb: UntypedFormBuilder, private route: ActivatedRoute, private router: Router,
    public http: HttpClient, public map: GoogleService,
    public msg: NotificationService, private cdr: ChangeDetectorRef, public auth: AuthService) { }

  ngOnInit() {
    // 取得資料
    // 初始化我的form  同時把我拿到的資料放到form

    this.getUserInfo();
    this.initForm();

    this.auth.userInfo$.subscribe(info => {
      this.orderForm.patchValue({
        userID: info.data.userId
      });
    })

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
          // icon: {
          //   url: 'http://maps.google.com/mapfiles/ms/micons/red.png',
          //   scaledSize: new google.maps.Size(45, 45), // 尺寸(32, 32)
          //   origin: new google.maps.Point(0, 0), // 原點(0, 0)
          //   anchor: new google.maps.Point(16, 16) // 錨點(16, 16)
          // }
        }
        this.setGooglePostion(o)
      })
      .catch(error => {
        this.center = { lat: 23.897739340971725, lng: 121.54227420918299 }
        this.msg.showError("取得當前位置錯誤，請聯繫技術人員！", "錯誤")
        console.error(error);
      });
  }

  initForm() {
    this.orderForm = this.fb.group({
      userID: [0, Validators.compose([Validators.required])],
      // phoneNumber: [null, Validators.compose([Validators.required])],
      startLocation: [null, Validators.compose([Validators.required])],
      destination: [null, Validators.compose([Validators.required])],
      pickupTime: [null, Validators.compose([Validators.required])],
      priceRangeUp: [null, Validators.compose([Validators.required])],
      priceRangeDown: [null, Validators.compose([Validators.required])],
    });


    this.orderForm.get('startLocation').valueChanges.subscribe(value => {
      this.showInMap(value, '起始');
    });

    this.orderForm.get('destination').valueChanges.subscribe(value => {
      this.showInMap(value, '目的');
    });
  }

  getUserInfo() {
    // 去跟後端要資料
    this.userInfo = { id: 1, phone: "09999999", money: "5745484" };
  }

  sendOrder() {
    
    if(this.orderForm.get('priceRangeDown').value > this.orderForm.get('priceRangeUp').value){
      this.msg.showError("價格上限不可低於價格下限", "")
      return;
    }
    this.markAllAsTouchedAndDirty();
    if (this.orderForm.valid) {
      this.http.post<any>("passenger/bookings", this.orderForm.getRawValue()).subscribe(data => {
        this.msg.showSuccess("下單成功，將為您配對合適的司機！", "")
        // this.router.navigate(['/waiting']); 
        this.router.navigate(['/']); 
      })
    } else {
      this.msg.showError("資料填寫不完整", "")
    }
  }

  setGooglePostion(postion: Options) {
    this.markers.options.push(postion as Options)
    this.markers.position.push(postion.position)
    // console.log(this.markers)
    this.reloadMap()
  }

  showInMap(value: string, type: string) {
    this.map.getCoordinates(value).subscribe(data => {
      if (data.status == "OK") {
        if (type == '起始') {
          const o = {
            position: data.results[0].geometry.location,
            label: {
              color: "black", text: "起始", fontSize: '15px', fontWeight: 'bold',
            },
            title: "起始位置",
            options: { draggable: false },
          }
          this.setGooglePostion(o)
        } else {
          const o = {
            position: data.results[0].geometry.location,
            label: {
              color: "black", text: "目的", fontSize: '15px', fontWeight: 'bold',
            },
            title: "目的地",
            options: { draggable: false },
          }
          this.setGooglePostion(o)
        }
      } else {
        this.msg.showError('請輸入有效地址');
      }

    })
  }

  // 重新加载地图
  reloadMap() {
    if (this.googleMap) {
      // 调用 ChangeDetectorRef 的 detectChanges 方法手动触发变化检测
      this.cdr.detectChanges();
    }
  }

  markAllAsTouchedAndDirty(): void {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
