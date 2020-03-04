import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  GettingSelectedReservationAction,
  RemoveReservationAction,
  UpdateReservationAction
} from '@src/app/core/state/actions/user.actions';
import { StateUser } from '@src/app/core/state/reducers/user.reducers';
import {
  defaultOpenValue,
  selectUsersReservations,
  selectUsersReservationsHours,
  selectUsersReservationStateEvents
} from '@src/app/core/state/selectors/user.selectors';
import { UserModel } from '@src/app/modules/home/interfaces/user-model.interface';
import { validationHours } from '@src/app/modules/home/validators/hours-validator';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GymReservationComponent implements OnInit {
  public email: string = localStorage.getItem('userEmail');
  public reservationList$: Observable<UserModel[]> = this.storeUser$.pipe(
    select(selectUsersReservationStateEvents)
  );
  public defaultOpenValue: Observable<Date> = this.storeUser$.pipe(
    select(defaultOpenValue)
  );
  public reservationHours: Observable<number[]> = this.storeUser$.pipe(
    select(selectUsersReservationsHours)
  );
  public selectedUsersReservation$: Observable<
    UserModel
  > = this.storeUser$.pipe(select(selectUsersReservations));
  public userReservationList: Observable<
    UserModel[]
  > = this.reservationList$.pipe(
    map((data: UserModel[]) => {
      const filter = data.filter((elem: { idUser: string }) => {
        if (elem.idUser === localStorage.getItem('userId')) {
          return elem;
        }
      });
      return filter;
    })
  );
  public updateReservationForm: FormGroup;
  public isVisible: boolean;
  constructor(
    private fb: FormBuilder,
    private storeUser$: Store<StateUser>,
    private modalService: NzModalService
  ) {}

  public remove(id: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to remove the reservation?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzCancelText: 'No',
      nzOnOk: (): void =>
        this.storeUser$.dispatch(new RemoveReservationAction(id))
    });
  }

  public showModal(resp: UserModel): void {
    this.storeUser$.dispatch(new GettingSelectedReservationAction(resp));
    this.isVisible = true;
  }

  public handleOk(): void {
    let id: string;
    let {
      pricePerHour,
      paymentAmount,
      reservationDate,
      initialTime,
      endTime,
      numberOfPeople
    } = this.updateReservationForm.value;
    this.selectedUsersReservation$.subscribe((selected: UserModel) => {
      console.log(selected);
      pricePerHour = selected.pricePerHour;
      id = selected.id;
      reservationDate = selected.reservationDate;
    });
    endTime = endTime.getHours();
    initialTime = initialTime.getHours();
    paymentAmount = pricePerHour * (endTime - initialTime);
    this.storeUser$.dispatch(
      new UpdateReservationAction(id, {
        paymentAmount,
        reservationDate,
        initialTime,
        endTime,
        numberOfPeople
      })
    );
    this.updateReservationForm.reset();
    this.isVisible = false;
  }

  public cancel(): void {
    this.isVisible = false;
  }

  public ngOnInit(): void {
    this.updateReservationForm = this.fb.group(
      {
        initialTime: [null, [Validators.required]],
        endTime: [null, [Validators.required]],
        numberOfPeople: [, [Validators.required]]
      },
      {
        validators: validationHours('endTime', 'initialTime')
      }
    );
  }

  public getReservationHours(): number[] {
    let arr: number[];
    this.reservationHours.subscribe((res: number[]) => (arr = res));
    return arr;
  }

  public disabledHours = (): number[] => this.getReservationHours();
}
