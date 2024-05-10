import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { OrderingComponent } from './ordering.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', component: OrderingComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    OrderingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderingModule { }
