import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference
} from '@angular/fire/firestore';
import { AdminModel } from '@src/app/modules/home/interfaces/admin-model.interface';
import { UnspalshInterface } from '@modules/home/interfaces/unsplash.interface';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class AdminService {
  constructor(private dataBase: AngularFirestore, private http: HttpClient) {}

  public createGym(
    gymName: string,
    maximumNumberOfPeople: number,
    price: number,
    img: string
  ): Observable<Promise<DocumentReference>> {
    try {
      return of(
        this.dataBase.collection('admin').add({
          gymName,
          maximumNumberOfPeople,
          price,
          img
        })
      );
    } catch (err) {
      alert(err);
    }
  }

  public updateGym(id: string, newData: AdminModel): Observable<void> {
    try {
      return from(
        this.dataBase
          .collection(`admin`)
          .doc(id)
          .update(newData)
      );
    } catch (err) {
      alert(err.message);
    }
  }

  public deleteGym(element: string): Observable<void> {
    try {
      return from(
        this.dataBase
          .collection('admin')
          .doc(element)
          .delete()
      );
    } catch (err) {
      alert(err.message);
    }
  }

  public loadingGyms(): Observable<AdminModel[]> {
    try {
      return this.dataBase
        .collection('admin')
        .snapshotChanges()
        .pipe(
          map((actions: Array<DocumentChangeAction<AdminModel>>) => {
            return actions.map(
              (a: {
                payload: { doc: { data: () => AdminModel; id: string } };
              }) => {
                const data = a.payload.doc.data() as AdminModel;
                const id = a.payload.doc.id as string;
                return { id, ...data };
              }
            );
          })
        );
    } catch (err) {
      alert(err.message);
    }
  }

  public searchPhotos(searchValue: string): Observable<UnspalshInterface> {
    try {
      const clientId = environment.clientId;
      const query = searchValue;
      return this.http.get<UnspalshInterface>(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`
      );
    } catch (err) {
      alert(err.message);
    }
  }
}
