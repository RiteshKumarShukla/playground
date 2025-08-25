import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { ProductListComponent } from './app/product-list/product-list.component';
import { ProductDetailComponent } from './app/product-detail/product-detail.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ProductListComponent },
      { path: 'product/:id', component: ProductDetailComponent }
    ])
  ]
});
