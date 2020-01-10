import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PluginManagerPreloadingStrategy } from 'lib';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'auth',
                loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
                data: {
                    preloading: {
                        networkAwarePreload: true
                    }
                }
            },
            {
                path: 'bookings',
                loadChildren: () => import('./modules/booking/booking.module').then(m => m.BookingModule),
            },
            {
                path: 'cart',
                loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule),
            },
            {
                path: 'product',
                loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
            },
            {
                path: 'user',
                loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
            },
        ], {
            enableTracing: false,
            paramsInheritanceStrategy: 'always',
            preloadingStrategy: PluginManagerPreloadingStrategy,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
