import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PickupComponent } from './pickup.component';
import { RouterModule, Routes } from '@angular/router';
import { PickupDetailComponent } from './pickup-detail/pickup-detail.component';
export const routes: Routes = [
  { path: '', component: PickupComponent, pathMatch: 'full' },
  { path: 'pickupdetail/:id', component: PickupDetailComponent, data: { breadcrumb: '訂單詳細資料' } }
];
@NgModule({
  declarations: [
    PickupComponent,
    PickupDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PickupModule { }
