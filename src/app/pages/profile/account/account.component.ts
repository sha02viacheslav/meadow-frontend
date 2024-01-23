import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, InputTextModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  formGroup: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.formGroup = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['', []],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
    });

    const user = this.authService.getUser();
    if (user) {
      this.formGroup.patchValue(user);
    }
  }
  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.submitted = true;
    this.userApiService.updateUser(this.formGroup.value).subscribe(
      res => {
        if (!res.success) {
          this.toastr.error(res.message?.[0]);
          return;
        }

        if (res.result) {
          this.authService.setToken(res.result);
          this.toastr.success(res.message?.[0]);
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
