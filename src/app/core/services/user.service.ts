import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '../state/reducers/auth.reducers';
import { selectAuthIdEvents } from '../state/selectors/auth.selectors';

@Injectable()
export class UserService {
  public userId: Observable<string> = this.store$.pipe(
    select(selectAuthIdEvents),
  );
  constructor(private db: AngularFirestore, private store$: Store<AuthState>) {}

  public getReservation(): Observable<void> {
    try {
      let resp: string;
      this.userId.subscribe((res: string) => (resp = res));
      return this.db
        .collection(`/reservations`)
        .doc(resp)
        .snapshotChanges()
        .pipe(
          map((actions: { payload: { id: string; data: any } }) => {
            const data = actions.payload.data();
            const id = actions.payload.id;
            return { id, ...data };
          }),
        );
    } catch (err) {
      alert(err.message);
    }
  }
  public createReservation(
    reservationDate: string,
    from: number,
    to: number,
    email: string,
    paymentAmount: number,
    numberOfPeople: number,
    gym: string,
  ): Observable<Promise<void>> {
    try {
      let resp: string;
      this.userId.subscribe((res: string) => (resp = res));
      return of(
        this.db
          .collection(`/reservations`)
          .doc(resp)
          .set({
            reservationDate,
            from,
            to,
            email,
            paymentAmount,
            numberOfPeople,
            gym,
          }),
      );
    } catch (err) {
      alert(err.message);
    }
  }
  public removeReservation(id: string): Observable<Promise<void>> {
    try {
      return of(
        this.db
          .collection("/reservations")
          .doc(id)
          .delete(),
      );
    } catch (err) {
      alert(err.message);
    }
  }
  public updateReservation(
    id: string,
    newData: any,
  ): Observable<Promise<void>> {
    try {
    return of(this.db.doc(`/reservations/${id}`).update(newData));
    } catch (err) {
      alert(err.message);
    }
  }
}
