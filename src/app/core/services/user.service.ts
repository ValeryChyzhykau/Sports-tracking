import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminData } from '../interfaces/admin-data.interface';
import { UserData } from '../interfaces/user-data.interface';
import { AuthState } from '../state/reducers/auth.reducers';
import { StateUser } from '../state/reducers/user.reducers';
import { selectAuthIdEvents } from '../state/selectors/auth.selectors';
import { selectGym } from '../state/selectors/user.selectors';

@Injectable()
export class UserService {
  public userId: Observable<string> = this.store$.pipe(
    select(selectAuthIdEvents),
  );
  public selectedGym: Observable<AdminData> = this.storeUser$.pipe(select(selectGym));

  constructor(private db: AngularFirestore, private store$: Store<AuthState>, private storeUser$: Store<StateUser>,
    ) {}

  public getReservation(): Observable<UserData[]> {
    try {
      return this.db
        .collection(`reservations`)
        .snapshotChanges()
        .pipe(
          map((actions: Array<DocumentChangeAction<UserData>>) => {
            return actions.map((a: { payload: { doc: { data: () => UserData; id: string; }; }; }) => {
              const data = a.payload.doc.data() as UserData;
              const id = a.payload.doc.id as string;
              return { id, ...data };
            });
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
  ): Observable<Promise<DocumentReference>> {
    try {
      let maximumNumberOfPeople: number;
      let price: number;
      this.selectedGym.subscribe((res: AdminData) => {
        price = res.price;
        maximumNumberOfPeople = res.maximumNumberOfPeople;
      });
      console.log(maximumNumberOfPeople);
      let resp: string;
      this.userId.subscribe((res: string) => (resp = res));
      return of(
        this.db
          .collection(`/reservations`)
          .add({
            maximumNumberOfPeople,
            pricePerHour: price,
            idUser: resp,
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
          .collection(`/reservations`)
          .doc(id)
          .delete(),
      );
    } catch (err) {
      alert(err.message);
    }
  }
  public updateReservation(
    id: string,
    newData: UserData,
  ): Observable<Promise<void>> {
    try {
    return of(this.db.doc(`/reservations/${id}`).update(newData));
    } catch (err) {
      alert(err.message);
    }
  }
}
