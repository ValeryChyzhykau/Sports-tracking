import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference
} from '@angular/fire/firestore';
import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { UserModel } from '@src/app/modules/home/interfaces/user-model.interface';
import { select, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { AuthState } from '../../state/reducers/auth.reducers';
import { StateUser } from '../../state/reducers/user.reducers';
import { selectAuthIdEvents } from '../../state/selectors/auth.selectors';
import { selectGym } from '../../state/selectors/user.selectors';

@Injectable()
export class UserService {
  public userId: Observable<string> = this.store$.pipe(
    select(selectAuthIdEvents)
  );
  public selectedGym: Observable<AdminModel> = this.storeUser$.pipe(
    select(selectGym)
  );

  constructor(
    private dataBase: AngularFirestore,
    private store$: Store<AuthState>,
    private storeUser$: Store<StateUser>
  ) {}

  public getReservation(): Observable<Array<DocumentChangeAction<UserModel>>> {
    try {
      return this.dataBase.collection(`reservations`).snapshotChanges();
    } catch (err) {
      alert(err.message);
    }
  }

  public createReservation(
    reservationDate: string,
    initialTime: number,
    endTime: number,
    email: string,
    paymentAmount: number,
    numberOfPeople: number,
    gymName: string
  ): Observable<DocumentReference> {
    try {
      let maximumNumberOfPeople: number;
      let price: number;
      this.selectedGym.subscribe((res: AdminModel) => {
        price = res.price;
        maximumNumberOfPeople = res.maximumNumberOfPeople;
      });
      let resp: string;
      this.userId.subscribe((res: string) => (resp = res));
      return from(
        this.dataBase.collection(`/reservations`).add({
          maximumNumberOfPeople,
          pricePerHour: price,
          idUser: resp,
          reservationDate,
          initialTime,
          endTime,
          email,
          paymentAmount,
          numberOfPeople,
          gymName
        })
      );
    } catch (err) {
      alert(err.message);
    }
  }

  public removeReservation(id: string): Observable<void> {
    try {
      return from(
        this.dataBase
          .collection(`/reservations`)
          .doc(id)
          .delete()
      );
    } catch (err) {
      alert(err.message);
    }
  }

  public updateReservation(id: string, newData: UserModel): Observable<void> {
    try {
      return from(this.dataBase.doc(`/reservations/${id}`).update(newData));
    } catch (err) {
      alert(err.message);
    }
  }
}
