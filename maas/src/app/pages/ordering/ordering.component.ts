import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-ordering",
  templateUrl: "./ordering.component.html",
  styleUrls: ["./ordering.component.scss"],
})
export class OrderingComponent implements OnInit {
  orderForm: UntypedFormGroup; // form
  userInfo: any = {}; // 定義 物件

  constructor(public fb: UntypedFormBuilder) {}

  ngOnInit() {
    // 取得資料
    // 初始化我的form  同時把我拿到的資料放到form

    this.getUserInfo();
    this.initForm();
    this.orderForm.patchValue({
      phone: this.userInfo.phone,
    });
  }

  initForm() {
    this.orderForm = this.fb.group({
      phone: ["", Validators.compose([Validators.required])],
      addressfrom: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      addressto: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      priceupto: ["", Validators.compose([Validators.required])],
      pricedownto: ["", Validators.compose([Validators.required])],
    });
  }

  getUserInfo() {
    // 去跟後端要資料
    this.userInfo = { id: 1, phone: "09999999", money: "5745484" };
  }

  sendOrder() {
    // 檢查該填寫的有沒有填寫
    // 如果沒有  提醒他填好
    // 如果有  發送給後端 讓訂單成立
    console.log(this.orderForm.value);
    if (this.orderForm.valid) {
      console.log("符合規定");
    } else {
      console.log("不符合規定");
    }
  }
}
