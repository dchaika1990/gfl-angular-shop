import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './components/shop/shop.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThanksComponent} from './components/thanks/thanks.component';

const routes: Routes = [
    {
        path: 'shop', children: [
            {path: '', component: ShopComponent},
            {path: 'cart', component: CartComponent},
            {path: 'checkout', component: CheckoutComponent},
            {path: 'thanks', component: ThanksComponent},
        ]
    }
];

@NgModule({
    declarations: [
        ShopComponent,
        CartComponent,
        CheckoutComponent,
        ThanksComponent
    ],
    exports: [
        RouterModule
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ]
})
export class ShopModule {
}
