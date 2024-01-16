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
import { SharedService } from './shared.service';
import { ToastrModule } from 'ngx-toastr';

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
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [SharedService],
})
export class SecureModule { }
