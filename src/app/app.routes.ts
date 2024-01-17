import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from '@guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { APP_ROUTE_SEGMENTS } from './@core/constants/routes/app-routes.constant';

export const routes: Routes = [
  {
    path: APP_ROUTE_SEGMENTS.AUTH,
    component: AuthLayoutComponent,
    children: [{ path: APP_ROUTE_SEGMENTS.LOGIN, component: LoginComponent }],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
];
