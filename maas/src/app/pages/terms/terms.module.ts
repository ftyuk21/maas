import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TermsComponent } from './terms.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', component: TermsComponent, pathMatch: 'full' }
];
@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TermsModule { }
