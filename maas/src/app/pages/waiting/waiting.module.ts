import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WaitingComponent } from './waiting.component';
import { RouterModule, Routes } from '@angular/router';
import { WaitingConfirmComponent } from './waiting-confirm/waiting-confirm.component';
export const routes: Routes = [
  { path: '', component: WaitingComponent, pathMatch: 'full' },
  { path: '', component: WaitingConfirmComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    WaitingComponent,
    WaitingConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)

  ]
})
export class WaitingModule { }
