import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/service/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule), data: { breadcrumb: 'Account Settings' } },
            { path: 'customer', loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule), canActivate: [AuthGuard] },
            { path: 'agree', loadChildren: () => import('./pages/agree/agree.module').then(m => m.AgreeModule), canActivate: [AuthGuard] },
            { path: 'driver', loadChildren: () => import('./pages/driver/driver.module').then(m => m.DriverModule), canActivate: [AuthGuard] },
            { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule), data: { breadcrumb: 'Compare' } },
            { path: 'wishlist', loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule), data: { breadcrumb: 'Wishlist' } },
            { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule), data: { breadcrumb: 'Cart' } },
            { path: 'pickup', loadChildren: () => import('./pages/pickup/pickup.module').then(m => m.PickupModule), data: { breadcrumb: '接送' }, canActivate: [AuthGuard] },
            { path: 'ordering', loadChildren: () => import('./pages/ordering/ordering.module').then(m => m.OrderingModule), data: { breadcrumb: '訂單詳細資料' }, canActivate: [AuthGuard] },
            { path: 'waiting', loadChildren: () => import('./pages/waiting/waiting.module').then(m => m.WaitingModule), data: { breadcrumb: '等待' } },
            { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule), data: { breadcrumb: 'Checkout' } },
            { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule), data: { breadcrumb: 'Contact' } },
            // { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule), data: { breadcrumb: 'Sign In ' } },
            { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule), data: { breadcrumb: 'Brands' } },
            { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), data: { breadcrumb: 'All Products' } }
        ]
    },
    { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    { path: 'about-us', loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule) },
    { path: 'privacy', loadChildren: () => import('./pages/privacy/privacy.module').then(m => m.PrivacyModule) },
    { path: 'terms', loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsModule) },
    { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)},
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking'
})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }