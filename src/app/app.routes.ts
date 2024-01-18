import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { APP_ROUTE_SEGMENTS } from './@core/constants/routes/app-routes.constant';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

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
    children: [{ path: '', component: DashboardComponent }],
  },
];
