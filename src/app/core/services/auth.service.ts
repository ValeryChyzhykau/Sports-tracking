import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Unsubscribe } from 'firebase';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {}
  public signUp(
    email: string,
    password: string,
    userName: string,
    login: string,
    phone: number,
  ): Observable<void> {
    try {
      return from(
        this.afAuth.auth
          .createUserWithEmailAndPassword(email, password)
          .then((res: User) => {
            return this.db
              .collection('users')
              .doc(res.user.uid)
              .set({
                email,
                phone,
                userName,
                login,
              });
          }),
      );
    } catch (error) {
      alert(error.message);
    }
  }
  public login(email: string, password: string): Observable<User> {
    try {
      return from(
        this.afAuth.auth.signInWithEmailAndPassword(email, password),
      );
    } catch (err) {
      alert(err.message);
    }
  }

  public logout(): Observable<void> {
    try {
      localStorage.clear();
      this.router.navigate(["/login"]);
      return from(this.afAuth.auth.signOut());
    } catch (err) {
      alert (err.message);
    }
  }

  public checkStatus(): Observable<boolean> {
    try {
    return this.afAuth.authState.pipe(
      map((data: firebase.User) => {
        if (data !== undefined && data !== null) {
          return true;
        } else {
          return false;
        }
      }),
    );
    } catch (err) {
      alert(err.message);
    }
  }
  public getToken(): Unsubscribe {
    try {
    return this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
      user.getIdTokenResult(true).then((res: firebase.auth.IdTokenResult) => {
        localStorage.setItem('userToken', JSON.stringify(res.token));
        return res.token;
      });
    });
  } catch (err) {
    alert(err.message);
  }
}
}
