import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChartsComponent } from './pages/charts/charts.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ErrorPageComponent } from './pages/external/error-page/error-page.component';
import { ResetPaswordComponent } from './pages/external/reset-pasword/reset-pasword.component';
import { SigninComponent } from './pages/external/signin/signin.component';
import { SignupComponent } from './pages/external/signup/signup.component';
import { Signup2Component } from './pages/signup2/signup2.component';
import { HelpComponent } from './pages/help/help.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SpecialaccountComponent } from './pages/specialaccount/specialaccount.component';
import { ResetpassformComponent } from './pages/resetpassform/resetpassform.component';
import { TalentListComponent } from './pages/talent-list/talent-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'resetpassword', component: ResetPaswordComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'myaccount',
    component: SpecialaccountComponent,
    canActivate: [AuthGuard],
  },
  { path: 'help', component: HelpComponent, canActivate: [AuthGuard] },
  { path: '404error', component: ErrorPageComponent },
  { path: 'create', component: Signup2Component },
  { path: 'list-admins', component:  SpecialaccountComponent },
  { path: 'update-admin/:id', component: SignupComponent },
  { path: 'myprofile', component: SpecialaccountComponent },
  { path: 'restform', component: ResetpassformComponent },
  {path:'clientlist',component:ClientListComponent,canActivate:[AuthGuard]},
  {path:'talentlist',component:TalentListComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/404error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
