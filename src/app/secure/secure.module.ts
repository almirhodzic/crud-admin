import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { SecureComponent } from './secure.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordComponent } from './password/password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { FooterComponent } from './footer/footer.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ProductsComponent } from './products/products.component';
import { RolesComponent } from './roles/roles.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { UploadComponent } from './components/upload/upload.component';
import { SharedService } from '../services/shared.service';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { OnlyAdminDirective } from '../directives/only-admin.directive';
import { OnlyClientsDirective } from '../directives/only-clients.directive';
import { RestrictedComponent } from './restricted/restricted.component';
import { BreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItemComponent } from '../components/breadcrumbs/breadcrumb-item/breadcrumb-item.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './shop/product/product.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './nav/dropdown/dropdown.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyOrdersDetailComponent } from './myorders/detail/detail.component';

@NgModule({
  declarations: [
    NavComponent,
    MenuComponent,
    SecureComponent,
    ProfileComponent,
    DashboardComponent,
    PasswordComponent,
    UsersComponent,
    UserCreateComponent,
    FooterComponent,
    UserEditComponent,
    ProductsComponent,
    RolesComponent,
    RoleCreateComponent,
    RoleEditComponent,
    ProductCreateComponent,
    ProductEditComponent,
    OrdersComponent,
    UploadComponent,
    CategoriesComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    OnlyAdminDirective,
    OnlyClientsDirective,
    BreadcrumbsComponent,
    BreadcrumbItemComponent,
    RestrictedComponent,
    ShopComponent,
    ProductComponent,
    PaginatorComponent,
    DropdownComponent,
    BasketComponent,
    CheckoutComponent,
    MyordersComponent,
    MyOrdersDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      easing: 'ease-in',
      enableHtml: true,
    }),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    SharedService
  ],
})
export class SecureModule { }
