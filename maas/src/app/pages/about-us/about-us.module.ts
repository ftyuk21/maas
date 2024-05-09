import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AboutUsComponent } from './about-us.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', component: AboutUsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutUsModule { }
