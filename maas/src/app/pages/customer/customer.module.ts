import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerIngComponent } from './customer-ing/customer-ing.component';
import { CustomerChatComponent } from './customer-chat/customer-chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CustomerOrderListComponent } from './customer-order-list/customer-order-list.component'; // <-- 匯入 FormsModule
import { CustomerStatesCodePipe, TimePipe } from './customer.pipe';
import { CustomerOrderDetailComponent } from './customer-order-detail/customer-order-detail.component';
import { DatePipe } from '@angular/common';


export const routes: Routes = [
  { path: 'customer-ing/:orderId', component: CustomerIngComponent, pathMatch: 'full', data: { breadcrumb: '訂單進行中' } },
  { path: 'customer-order-list', component: CustomerOrderListComponent, pathMatch: 'full', data: { breadcrumb: '歷史訂單紀錄' } },
  { path: 'customer-order-detail/:orderId', component: CustomerOrderDetailComponent, pathMatch: 'full', data: { breadcrumb: '訂單詳細資訊' } }
];


@NgModule({
  declarations: [
    CustomerIngComponent,
    CustomerChatComponent,
    CustomerOrderListComponent,
    CustomerStatesCodePipe,
    TimePipe,
    CustomerOrderDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    CustomerStatesCodePipe,
    TimePipe
  ],
  providers: [DatePipe],
})
export class CustomerModule { }
