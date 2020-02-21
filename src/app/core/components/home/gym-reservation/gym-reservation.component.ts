import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { GettingSelectedReservation, LoadReservationList, RemoveReservation, UpdateReservation } from '@src/app/core/state/actions/user.actions';
import { StateUser } from '@src/app/core/state/reducers/user.reducers';
import { defaultOpenValue, selectUsersReservations, selectUsersReservationStateEvents } from '@src/app/core/state/selectors/user.selectors';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.component.html',
  styleUrls: ['./gym-reservation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GymReservationComponent implements OnInit {
  public email: string = localStorage.getItem('userEmail');
  public reservationList$: Observable<any> = this.storeUser$.pipe(
    select(selectUsersReservationStateEvents),
  );
  public defaultOpenValue: Observable<Date> = this.storeUser$.pipe(select(defaultOpenValue));

  public selectedusersReservation$: Observable<string> = this.storeUser$.pipe(
    select(selectUsersReservations),
  );
  public userReservationList: Observable<any> = this.reservationList$.pipe(
    map((data) => {
      const filter = data.filter((elem: { idUser: string; }) => {
        if (elem.idUser === localStorage.getItem('userId')) {
          return elem;
        }
      });
      return filter;
    }),
  );
  public updateReservationForm: FormGroup;
  public isVisible: boolean;
  constructor(
    private fb: FormBuilder,
    private storeUser$: Store<StateUser>,
    private modalService: NzModalService,
  ) { this.storeUser$.dispatch(new LoadReservationList());}
  public remove(id: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to remove the reservation?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzCancelText: 'No',
      nzOnOk: (): void => this.storeUser$.dispatch(new RemoveReservation(id)),
    });
  }
  public showModal(resp: any): void {
    this.storeUser$.dispatch( new GettingSelectedReservation (resp) );
    this.isVisible = true;
  }
  public handleOk(): void {
    let id: string;
    let pricePerHour: number;
    this.selectedusersReservation$.subscribe((selected: any) => {
      pricePerHour = selected.pricePerHour;
      id = selected.id;
    });
    const result = {
      paymentAmount:
        pricePerHour *
        (this.updateReservationForm.controls.to.value.getHours() -
          this.updateReservationForm.controls.from.value.getHours()),
      reservationDate: this.updateReservationForm.controls.reservationDate.value.toISOString().slice(0, -14),
      from: this.updateReservationForm.controls.from.value.getHours(),
      to: this.updateReservationForm.controls.to.value.getHours(),
      numberOfPeople: this.updateReservationForm.controls.numberOfPeople.value,
    };
    this.storeUser$.dispatch( new UpdateReservation(id , result) );
    this.updateReservationForm.reset();
    this.isVisible = false;
  }
  public cancel(): void {
    this.isVisible = false;
  }
  public ngOnInit(): void {
    this.updateReservationForm = this.fb.group({
      reservationDate: [null, [Validators.required]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
      numberOfPeople: [, [Validators.required]],
    });
  }
}
