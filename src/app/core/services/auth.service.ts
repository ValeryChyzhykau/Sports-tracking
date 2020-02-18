import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}
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
          .then((res: any) => {
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
  public login(email: string, password: string): Observable<any> {
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
      });
    });
  } catch (err) {
    alert(err.message);
  }
}
}
