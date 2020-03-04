import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  LogInAction,
  SignUpAction
} from '@src/app/core/state/actions/auth.actions';
import { AuthState } from '@src/app/core/state/reducers/auth.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public signUpForm: FormGroup;
  public isVisible: boolean = false;
  constructor(private store$: Store<AuthState>, private fb: FormBuilder) {}

  public login(): void {
    try {
      const {
        userEmail,
        userPassword
      }: { userEmail: string; userPassword: string } = this.loginForm.value;
      this.store$.dispatch(
        new LogInAction({ email: userEmail, password: userPassword })
      );
    } catch (err) {
      alert(err);
    }
  }

  public signUp(): void {
    const {
      userEmail,
      userPassword,
      userPhone,
      userLogin,
      userName
    }: {
      userEmail: string;
      userPassword: string;
      userPhone: number;
      userLogin: string;
      userName: string;
    } = this.signUpForm.value;
    this.store$.dispatch(
      new SignUpAction({
        email: userEmail,
        password: userPassword,
        phone: userPhone,
        login: userLogin,
        userName
      })
    );
    this.isVisible = false;
  }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      userPassword: [null, [Validators.required, Validators.minLength(6)]]
    });
    this.signUpForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      userPassword: [null, [Validators.required, Validators.minLength(6)]],
      userPhone: [null, [Validators.pattern('[0-9]{9}'), Validators.required]],
      userLogin: [null, [Validators.required]],
      userName: [null, [Validators.required]]
    });
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public handleCancel(): void {
    this.isVisible = false;
  }
}
