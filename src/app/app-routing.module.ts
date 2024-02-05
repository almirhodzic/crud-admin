import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { SecureComponent } from './secure/secure.component';
import { PublicComponent } from './public/public.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { PasswordComponent } from './secure/password/password.component';
import { UsersComponent } from './secure/users/users.component';
import { UserCreateComponent } from './secure/users/user-create/user-create.component';
import { UserEditComponent } from './secure/users/user-edit/user-edit.component';
import { RolesComponent } from './secure/roles/roles.component';
import { ProductsComponent } from './secure/products/products.component';
import { RoleCreateComponent } from './secure/roles/role-create/role-create.component';
import { RoleEditComponent } from './secure/roles/role-edit/role-edit.component';
import { ProductCreateComponent } from './secure/products/product-create/product-create.component';
import { ProductEditComponent } from './secure/products/product-edit/product-edit.component';
import { OrdersComponent } from './secure/orders/orders.component';
import { ThankyouComponent } from './public/thankyou/thankyou.component';
import { ConfirmedComponent } from './public/confirmed/confirmed.component';
import { VerifyAccountComponent } from './public/verify-account/verify-account.component';
import { PasswordForgotComponent } from './public/password-forgot/password-forgot.component';
import { PasswordSetComponent } from './public/password-set/password-set.component';
import { PasswordResetedComponent } from './public/password-reseted/password-reseted.component';
import { CategoriesComponent } from './secure/categories/categories.component';
import { CategoryCreateComponent } from './secure/categories/category-create/category-create.component';
import { CategoryEditComponent } from './secure/categories/category-edit/category-edit.component';

const routes: Routes = [
  {
    path: '', component: SecureComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'password', component: PasswordComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user-create', component: UserCreateComponent },
      { path: 'user/:id/edit', component: UserEditComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles-create', component: RoleCreateComponent },
      { path: 'roles/:id/edit', component: RoleEditComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id/edit', component: ProductEditComponent },
      { path: 'product-create', component: ProductCreateComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'category-create', component: CategoryCreateComponent },
      { path: 'category/:id/edit', component: CategoryEditComponent },
    ]
  },
  {
    path: '', component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'password-forgot', component: PasswordForgotComponent },
      { path: 'password-set', component: PasswordSetComponent },
      { path: 'password-reseted', component: PasswordResetedComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'thankyou', component: ThankyouComponent },
      { path: 'verify', component: VerifyAccountComponent },
      { path: 'account-confirmed', component: ConfirmedComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }