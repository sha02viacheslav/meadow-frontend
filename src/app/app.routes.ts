import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { APP_ROUTE_SEGMENTS } from '@constants';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountComponent } from './pages/profile/account/account.component';
import { PasswordComponent } from './pages/profile/password/password.component';
import { DocumentsComponent } from './pages/profile/documents/documents.component';

export const routes: Routes = [
  {
    path: APP_ROUTE_SEGMENTS.AUTH,
    component: AuthLayoutComponent,
    children: [
      { path: APP_ROUTE_SEGMENTS.LOGIN, component: LoginComponent },
      { path: APP_ROUTE_SEGMENTS.FORGOT_PASSWORD, component: ForgotPasswordComponent },
      { path: `${APP_ROUTE_SEGMENTS.RESET_PASSWORD}/:resetPasswordToken`, component: ResetPasswordComponent },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: APP_ROUTE_SEGMENTS.DASHBOARD, component: DashboardComponent },
      {
        path: APP_ROUTE_SEGMENTS.PROFILE,
        component: ProfileComponent,
        children: [
          { path: APP_ROUTE_SEGMENTS.ACCOUNT, component: AccountComponent },
          { path: APP_ROUTE_SEGMENTS.PASSWORD, component: PasswordComponent },
          { path: APP_ROUTE_SEGMENTS.DOCUMENTS, component: DocumentsComponent },
          { path: '', redirectTo: APP_ROUTE_SEGMENTS.ACCOUNT, pathMatch: 'full' },
        ],
      },
      { path: APP_ROUTE_SEGMENTS.BILLING, component: DashboardComponent },
      { path: APP_ROUTE_SEGMENTS.FAQ, component: DashboardComponent },
      { path: APP_ROUTE_SEGMENTS.CONTACT_US, component: DashboardComponent },
    ],
  },
];
