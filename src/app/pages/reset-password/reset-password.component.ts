import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthApiService } from '@services/api/auth-api/auth-api.service';
import { BackLinkComponent } from '../../components/back-link/back-link.component';
import { PasswordModule } from 'primeng/password';
import { APP_ROUTES, PASSWORD_REGEX } from '@constants';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    BackLinkComponent,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  protected readonly APP_ROUTES = APP_ROUTES;
  token: string = '';
  formGroup: FormGroup;
  submitted = false;
  passwordChanged = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('resetPasswordToken')) {
        this.token = params.get('resetPasswordToken') || '';
      }
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.submitted = true;
    this.authApiService.resetPassword({ token: this.token, password: this.formGroup.value.password }).subscribe(
      res => {
        if (!res.success) {
          this.toastr.error(res.message?.[0]);
          return;
        }

        this.passwordChanged = true;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.message);
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
