import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ProductListComponent } from './app/product-list/product-list.component';
import { ProductDetailComponent } from './app/product-detail/product-detail.component';
import { ContactComponent } from './app/contact/contact.component';
import { CartComponent } from './app/cart/cart.component';
// import { FavouritesComponent } from './app/favourites/favourites.component';
import { ProfileComponent } from './app/profile/profile.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'cart', component: CartComponent },
      // { path: 'favourites', component: FavouritesComponent },
      { path: 'profile', component: ProfileComponent }
    ], withComponentInputBinding())
  ]
});
