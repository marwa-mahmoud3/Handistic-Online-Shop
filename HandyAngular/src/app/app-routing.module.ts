import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
import { ForgetpasswordComponent } from './authentication/forgetpassword/forgetpassword.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"Register",component : RegisterComponent},
  {path:"Login",component : LoginComponent},
  {path:"ResetPassword",component:ResetPasswordComponent},
  {path:"forgetPassword",component:ForgetpasswordComponent},
  {path:"EmailConfirmation",component:EmailConfirmationComponent},
  {path:"AdminPanel",component:AdminDashboardComponent},
  {path:"Products",component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
