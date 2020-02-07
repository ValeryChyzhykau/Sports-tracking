import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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
  ): Observable<any> {
    try {
      return this.fromFirebaseAuthPromise(
        this.afAuth.auth
          .createUserWithEmailAndPassword(email, password)
          .then((res: any) => {
            return this.db
              .collection("users")
              .doc(res.user.uid)
              .set({
                email,
                userName,
                login,
                phone,
              });
          }),
      );
    } catch (error) {
      alert(error.message);
    }
  }
  public login(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password),
    );
  }

  public logout(): Observable<any> {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.signOut());
  }

  public checkStatus(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((data) => {
        if (data !== undefined && data !== null) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
  private fromFirebaseAuthPromise(promise: Promise<any>): Observable<any> {
    return from(promise as Promise<any>);
  }
}

// CheckAdminStatus: boolean;
// this.service.checkStatus().onAuthStateChanged((user) => {
//   if (user) {
//     user.getIdTokenResult().then( (token) => {
//       this.checkAdminStatus = token.claims.admin;
//       console.log(this.checkAdminStatus);
//     });
//   }
// });
