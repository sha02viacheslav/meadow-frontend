import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from '@dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private apiService: ApiService) {}

  userLogin(data: LoginDto): Observable<ApiResponse<string>> {
    return this.apiService.post('auth/login', data);
  }

  forgotPassword(data: ForgotPasswordDto): Observable<ApiResponse<void>> {
    return this.apiService.post('auth/forgot-password', data);
  }

  resetPassword(data: ResetPasswordDto): Observable<ApiResponse<void>> {
    return this.apiService.post('auth/reset-password', data);
  }
}
