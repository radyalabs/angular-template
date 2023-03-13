import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router';

import { APP_KEY } from '@/enums/key.enum';
import { AuthenticationService } from '@/services/authentication.service';
import { StorageService } from '@/services/storage.service';
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
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.listenForRoute();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('sa', [Validators.required]),
      password: new FormControl('qwerty@123', [Validators.required]),
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
        const { payload, isSuccess, message } = value;
        if (!isSuccess) {
          window.alert(message);
          return;
        }
        const data: StorageTypes = {
          key: APP_KEY.token,
          value: `${payload.tokenScheme} ${payload.token}`,
        };

        this.storageService.storeKeys(data);
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
}
