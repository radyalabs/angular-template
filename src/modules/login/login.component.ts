import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  Router,
} from '@angular/router';

import { AppKey } from '@/enums/key.enum';
import { setCookies } from '@/helpers/cookies.helper';
import { AuthenticationService } from '@/services/authentication.service';
import { SnackbarService } from '@/services/components/snackbar.service';
import { StorageTypes } from '@/types/storage-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isLoading = false;

  redirectTo!: Params;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.listenForRoute();
    this.checkAnyActiveSession();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('Admin', [Validators.required]),
      password: new FormControl('Qwerty@1234', [Validators.required]),
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].updateValueAndValidity();
      });

      return;
    }

    this.isLoading = true;
    this.loginForm.disable();

    this.authService.login(this.loginForm.value).subscribe({
      next: (value) => {
        const {
          userId,
          expiry,
          accessToken,
          refreshToken,
        } = value;

        if (!accessToken || !refreshToken) {
          window.alert('Dang, we can not identify you :(. Please try again later!');
          return;
        }

        const importantKey: StorageTypes[] = [
          {
            key: AppKey.accessToken,
            value: accessToken,
          },
          {
            key: AppKey.refreshToken,
            value: refreshToken,
          },
          {
            key: AppKey.userId,
            value: userId,
          },
          {
            key: AppKey.expiresIn,
            value: expiry.toString(),
          },
        ];

        // set cookies
        setCookies(
          importantKey,
          new Date(expiry),
          true,
          'strict',
        );

        this.router.navigate([this.redirectTo || '/dashboard']);
      },
      error: (error) => {
        console.error({ error });
      },
      complete: () => {
        this.isLoading = false;
        this.loginForm.enable();
      },
    });
  }

  listenForRoute() {
    this.route.queryParams.subscribe((value) => {
      this.redirectTo = value['redirectTo'] || null;
    });
  }

  checkAnyActiveSession(): void {
    if (this.authService.checkSession()) {
      setTimeout(() => {
        this.snackbarService.create('Welcome back!', '', {
          duration: 3000,
        });

        this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      this.authService.logout();
    }
  }
}
