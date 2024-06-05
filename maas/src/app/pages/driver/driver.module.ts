import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DriverIngComponent } from './driver-ing/driver-ing.component';
import { DriverChatComponent } from './driver-chat/driver-chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: 'driver-ing/:id', component: DriverIngComponent, pathMatch: 'full', data: { breadcrumb: '訂單進行中' } }
];

@NgModule({
  declarations: [
    DriverIngComponent,
    DriverChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DriverModule { }
