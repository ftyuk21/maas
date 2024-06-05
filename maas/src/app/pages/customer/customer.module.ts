import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerIngComponent } from './customer-ing/customer-ing.component';
import { CustomerChatComponent } from './customer-chat/customer-chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms'; // <-- 匯入 FormsModule


export const routes: Routes = [
  { path: 'customer-ing/:id', component: CustomerIngComponent, pathMatch: 'full', data: { breadcrumb: '訂單進行中' } }
];


@NgModule({
  declarations: [
    CustomerIngComponent,
    CustomerChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
