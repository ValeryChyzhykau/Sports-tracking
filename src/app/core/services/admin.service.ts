import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminData } from '../interfaces/admin-data.interface';
import { UnspalshInterface } from '../interfaces/unsplash.interface';

@Injectable()
export class AdminService {
  constructor(
    private db: AngularFirestore,
    private http: HttpClient,
  ) {}

  public createGym(
    gymName: string,
    maximumNumberOfPeople: number,
    price: number,
    img: string,
  ): Observable<Promise<DocumentReference>> {
    try {
    return of(
      this.db.collection('admin').add({
        gymName,
        maximumNumberOfPeople,
        price,
        img,
      }),
    );
    } catch (err) {
      alert(err);
    }
  }
  public updateGym(id: string, newData: AdminData): Observable<Promise<void>> {
  try {
   return of(this.db.doc(`admin/${id}`).update(newData));
  } catch (err) {
    alert(err.message);
  }
  }
  public deleteGym(element: string): Observable<Promise<void>> {
    try {
    return of(
      this.db
        .collection('admin')
        .doc(element)
        .delete(),
    );
    } catch (err) {
      alert(err.message);
    }
  }
  public loadingNewGym(): Observable<AdminData[]> {
    try {
    return this.db
      .collection('admin')
      .snapshotChanges()
      .pipe(
        map((actions: Array<DocumentChangeAction<AdminData>>) => {
           return actions.map((a: { payload: { doc: { data: () => AdminData; id: string; }; }; }) => {
            const data = a.payload.doc.data() as AdminData;
            const id = a.payload.doc.id as string;
            return { id, ...data };
          });
        },
        ),
      );
    } catch (err) {alert(err.message);
    }
  }
  public searchPhotos(searchValue: string): Observable<UnspalshInterface> {
    try {
    const clientId =
      'd5c07a01ad0599cdaa0621d32ce74810b266a1e49098914ef4593b3f9ba9885d';
    const query = searchValue;
    return this.http.get<UnspalshInterface>(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`,
    );
    } catch (err) {
      alert(err.message);
    }
  }
}
