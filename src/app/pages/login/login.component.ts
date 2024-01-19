import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthApiService } from '@services/api/auth-api/auth-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { APP_ROUTES } from '@constants';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    RouterLink,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  protected readonly APP_ROUTES = APP_ROUTES;
  formGroup: FormGroup;
  submitted: boolean = false;
  returnUrl: string = '/';

  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false, [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
      console.log(this.returnUrl);
    });
  }

  goBack() {
    this.router.navigateByUrl(this.returnUrl);
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.submitted = true;
    this.authApiService.userLogin(this.formGroup.value).subscribe(
      res => {
        if (!res.success) {
          this.toastr.error(res.message?.[0]);
          return;
        }

        if (res.result) {
          this.authService.setToken(res.result);
          this.goBack();
        }
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
