import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  AddingNewPicture,
  GettingIdentifier,
  LoadGymList,
  RemoveGym,
  ReservationLoadingForSelectedDate,
  SearchImgUnsplash,
  UpdateGym } from '@src/app/core/state/actions/admin.actions';
import { AddNewReservation, GettingInformationAboutTheSelectedGym } from '@src/app/core/state/actions/user.actions';
import { StateAdmin } from '@src/app/core/state/reducers/admin.reducers';
import { StateUser } from '@src/app/core/state/reducers/user.reducers';
import {
   blockedHoursEvents,
   LoadedGymsEvents,
   selectAdminStateEvents,
   selectedId,
   selectPicture,
   selectUnspalshEvents } from '@src/app/core/state/selectors/admin.selectors';
import {
  defaultOpenValue,
  selectGym,
  } from '@src/app/core/state/selectors/user.selectors';
import { AdminData } from '@src/app/modules/home/interfaces/admin-data.interface';
import { UserData } from '@src/app/modules/home/interfaces/user-data.interface';
import { validationHours } from '@src/app/modules/home/validators/hours-validator';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  public isVisibleOrder: boolean = false;
  public isVisible: boolean = false;
  public isVisibleSearch: boolean = false;
  public reservationForm: FormGroup;
  public selectedGym$: Observable<AdminData> = this.storeUser$.pipe(select(selectGym));
  public defaultOpenValue: Observable<Date> = this.storeUser$.pipe(select(defaultOpenValue));
  public imgItem: Observable<string[]> = this.storeAdmin$.pipe(
    select(selectUnspalshEvents),
  );
  public searchForm: FormGroup;
  public updateGymForm: FormGroup;
  public gyms: Observable<AdminData[]> = this.storeAdmin$.pipe(
    select(LoadedGymsEvents),
  );
  public blockedHours: Observable<number[]> = this.storeAdmin$.pipe(
    select(blockedHoursEvents),
  );
  public checkAdminStatus: Observable<boolean> = this.storeAdmin$.pipe(
    select(selectAdminStateEvents),
  );
  public selectedPicture: Observable<string> = this.storeAdmin$.pipe(
    select(selectPicture),
  );
  private selectedId: Observable<string> = this.storeAdmin$.pipe(
    select(selectedId),
  );

  constructor(
    private storeAdmin$: Store<StateAdmin>,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private storeUser$: Store<StateUser>,
  ) { }
  public remove(event: AdminData): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this gym',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzCancelText: 'No',
      nzOnOk: (): void => this.storeAdmin$.dispatch(new RemoveGym(event.id)),
    });
  }
  public showModal(resp: AdminData): void {
    this.storeAdmin$.dispatch(new GettingIdentifier(resp.id));
    this.updateGymForm = this.fb.group({
      gymName: [resp.gymName, [Validators.required]],
      maximumNumberOfPeople: [
        resp.maximumNumberOfPeople,
        [Validators.required],
      ],
      price: [resp.price, [Validators.required]],
    });
    this.storeAdmin$.dispatch(new AddingNewPicture(resp.img));
    this.isVisible = true;
  }
  public handleCancel(): void {
    this.storeAdmin$.dispatch(new AddingNewPicture(''));
    this.isVisible = false;
  }
  public handleOk(): void {
    let id: string;
    this.selectedId.subscribe((resp: string) => (id = resp));
    let picture: string;
    this.selectedPicture.subscribe((response: string) => (picture = response));
    const result = {
      gymName: this.updateGymForm.controls.gymName.value,
      maximumNumberOfPeople: this.updateGymForm.controls.maximumNumberOfPeople
        .value,
      price: this.updateGymForm.controls.price.value,
      img: picture,
    };
    this.storeAdmin$.dispatch(new UpdateGym(id, result));
    this.updateGymForm.reset();
    this.isVisible = false;
  }
  public openSearchWindow(): void {
    this.isVisibleSearch = true;
  }
  public cancel(): void {
    this.isVisibleSearch = false;
  }
  public search(): void {
    this.storeAdmin$.dispatch(
      new SearchImgUnsplash(this.searchForm.controls.search.value),
    );
  }
  public selectPicture(event: { srcElement: { src: string } }): void {
    this.storeAdmin$.dispatch(new AddingNewPicture(event.srcElement.src));
    this.isVisibleSearch = false;
  }
  public confirmReservation(): void {
    let price: number;
    let gymName: string;
    this.selectedGym$.subscribe((response: {
        price: number,
        gymName: string,
      }) => {
      price = response.price;
      gymName = response.gymName;
    });
    const result: UserData = {
      gym: gymName,
      email: localStorage.getItem('userEmail'),
      paymentAmount:
        price *
        (this.reservationForm.controls.to.value.getHours() -
          this.reservationForm.controls.from.value.getHours()),
      reservationDate: this.reservationForm.controls.reservationDate.value.toISOString().slice(0, -14),
      from: this.reservationForm.controls.from.value.getHours(),
      to: this.reservationForm.controls.to.value.getHours(),
      numberOfPeople: this.reservationForm.controls.numberOfPeople.value,
    };
    this.storeUser$.dispatch(new AddNewReservation(result));
    this.reservationForm.reset();

    this.isVisibleOrder = false;
  }
  public cancelReservation(): void {
    this.reservationForm.reset();
    this.isVisibleOrder = false;
  }
  public ngOnInit(): void {
    this.storeAdmin$.dispatch(new LoadGymList());
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]],
    });
    this.updateGymForm = this.fb.group({
      gymName: ['', [Validators.required]],
      maximumNumberOfPeople: [0, [Validators.required]],
      price: [0, [Validators.required]],
    });
    this.reservationForm = this.fb.group({
      reservationDate: [null, [Validators.required]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
      numberOfPeople: [null, [Validators.required], this.maximumNumberPeopleValidator()],
    }, {
      validators: validationHours('to', 'from'),
    });
  }
  public openOrderWindow(gym: AdminData): void {
    this.storeUser$.dispatch(new GettingInformationAboutTheSelectedGym(gym));
    this.isVisibleOrder = true;
  }
  public onTitleChange(event: Date): void {
    let gym: string;
    this.selectedGym$.subscribe((res: AdminData) => gym = res.gymName);
    this.storeAdmin$.dispatch(new ReservationLoadingForSelectedDate(event.toISOString().slice(0, -14), gym));
  }
  public getReservationHours(): number[] {
    let arr: number[];
    this.blockedHours.subscribe((res: number[]) => (arr = res));
    return arr;
  }
  public disabledHours = (): number[] => this.getReservationHours();
  private maximumNumberPeopleValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl,
    ):
      | Promise<{ [key: string]: boolean } | null>
      | Observable<{ [key: string]: boolean } | null> => {
      return this.selectedGym$.pipe(
        debounceTime(500),
        take(1),
        map((value) => {
          return value.maximumNumberOfPeople < control.value
            ? { invalid: true }
            : null;
        }),
      );
    };
  }
}
