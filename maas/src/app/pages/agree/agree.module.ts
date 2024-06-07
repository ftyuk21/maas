import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreeListComponent } from './agree-list/agree-list.component';
import { AgreeDetailComponent } from './agree-detail/agree-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'agree-list', component: AgreeListComponent, pathMatch: 'full' },
  { path: 'agree-detail/:orderId', component: AgreeDetailComponent, data: { breadcrumb: '待回覆訂單詳細資料' } }
];

@NgModule({
  declarations: [AgreeListComponent, AgreeDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AgreeModule { }
