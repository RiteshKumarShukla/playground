import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withDebugTracing } from '@angular/router';

import { AppComponent } from './app/app.component';
import { ProductListComponent } from './app/product-list/product-list.component';
import { ProductDetailComponent } from './app/product-detail/product-detail.component';
import { HomeComponent } from './app/home/home.component';
import { ContactComponent } from './app/contact/contact.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(
      [
        { path: '', component: HomeComponent },
        { path: 'products', component: ProductListComponent },
        { path: 'product/:id', component: ProductDetailComponent },
         { path: 'contact', component: ContactComponent }  
      ],
      withDebugTracing() // optional, helps debug routing issues
    )
  ]
})
  .catch(err => console.error(err));
