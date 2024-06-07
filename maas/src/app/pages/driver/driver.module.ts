import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DriverIngComponent } from './driver-ing/driver-ing.component';
import { DriverChatComponent } from './driver-chat/driver-chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DriverOrderListComponent } from './driver-order-list/driver-order-list.component';
import { DriverOrderDetailComponent } from './driver-order-detail/driver-order-detail.component';

export const routes: Routes = [
  { path: 'driver-ing/:orderId', component: DriverIngComponent, pathMatch: 'full', data: { breadcrumb: '訂單進行中' } },
  { path: 'driver-order-list', component: DriverOrderListComponent, pathMatch: 'full', data: { breadcrumb: '歷史訂單紀錄' } },
  { path: 'driver-order-detail/:orderId', component: DriverOrderDetailComponent, pathMatch: 'full', data: { breadcrumb: '訂單詳細資訊' } }
];

@NgModule({
  declarations: [
    DriverIngComponent,
    DriverChatComponent,
    DriverOrderListComponent,
    DriverOrderDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DriverModule { }
