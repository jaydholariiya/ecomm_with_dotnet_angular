import { Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

export const routes: Routes = [
    {path : 'side-bar' , component : SideBarComponent},
    {path : '' , component : HomeComponent},
    {path : 'seller-auth' , component : SellerAuthComponent},
    {path : 'seller-home' , component : SellerHomeComponent },
    {path : 'seller-add-product' , component : SellerAddProductComponent },
    {path : 'seller-update-product/:id' , component : SellerUpdateProductComponent },
    {path : 'search/:query', component : SearchComponent},
    {path : 'footer' , component : FooterComponent},
    {path : 'details/:productId' , component : ProductDetailsComponent},
    {path : 'user-auth', component : UserAuthComponent},
    {path : '**' , component : ErrorPageComponent },
 
];
