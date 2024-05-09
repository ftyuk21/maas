import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PrivacyComponent } from './privacy.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', component: PrivacyComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PrivacyModule { }
