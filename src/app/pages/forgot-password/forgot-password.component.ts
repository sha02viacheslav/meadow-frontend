import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { AuthApiService } from '@services/api/auth-api/auth-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '@constants';
import { BackLinkComponent } from '../../components/back-link/back-link.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputTextModule, NgIf, PaginatorModule, ReactiveFormsModule, BackLinkComponent, ButtonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  protected readonly APP_ROUTES = APP_ROUTES;
  formGroup: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private toastr: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.submitted = true;
    this.authApiService.forgotPassword(this.formGroup.value).subscribe(
      res => {
        if (!res.success) {
          this.toastr.error(res.message?.[0]);
          return;
        }

        this.toastr.success(res.message?.[0]);
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
