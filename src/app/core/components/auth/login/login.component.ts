import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { LogIn, LoginRedirect, SignUp } from '@src/app/core/state/actions/auth.actions';
import { AuthState } from '@src/app/core/state/reducers/auth.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public signUpForm: FormGroup;
  public isVisible: boolean = false;
  constructor(
    private store$: Store<AuthState>,
    private fb: FormBuilder,
    private service: AuthService,
  ) {}
  public submit(): void {
    try {
      const payload = {
        email: this.loginForm.controls.userEmail.value,
        password: this.loginForm.controls.userPassword.value,
      };
      this.store$.dispatch(new LogIn(payload));
    } catch (err) {
      alert(err);
    }
  }
  public signUp(): void {
    const payload = {
      email: this.signUpForm.controls.userEmail.value,
      password:  this.signUpForm.controls.userPassword.value,
      login:  this.signUpForm.controls.userLogin.value,
      userName:  this.signUpForm.controls.userName.value,
      phone: this.signUpForm.controls.userPhone.value,
    };
    this.store$.dispatch( new SignUp( payload));
    this.isVisible = false;
  }
  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      userPassword: [null, [Validators.required, Validators.minLength(6)]],
    });
    this.signUpForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      userPassword: [null, [Validators.required, Validators.minLength(6)]],
      userName: [null, [Validators.required]],
      userLogin: [null, [Validators.required]],
      userPhone: [null, [Validators.pattern('[0-9]{9}'), Validators.required]],
    });
  }
  public showModal(): void {
    this.isVisible = true;
  }
  public handleCancel(): void {
    this.isVisible = false;
  }
}
