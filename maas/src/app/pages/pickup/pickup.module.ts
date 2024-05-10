import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PickupComponent } from './pickup.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', component: PickupComponent, pathMatch: 'full' }
];
@NgModule({
  declarations: [
    PickupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PickupModule { }
