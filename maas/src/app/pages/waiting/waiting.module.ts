import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WaitingComponent } from './waiting.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', component: WaitingComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    WaitingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)

  ]
})
export class WaitingModule { }
