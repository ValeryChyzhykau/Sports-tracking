import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AddingNewPicture, GettingIdentifier, LoadGymList, RemoveGym, SearchImgUnsplash, UpdateGym } from '@src/app/core/state/actions/admin.actions';
import { AddNewReservation, GettingInformationAboutTheSelectedGym } from '@src/app/core/state/actions/user.actions';
import { StateAdmin } from '@src/app/core/state/reducers/admin.reducers';
import { StateUser } from '@src/app/core/state/reducers/user.reducers';
import { LoadedGymsEvents, selectAdminStateEvents, selectedId, selectPicture, selectUnspalshEvents } from '@src/app/core/state/selectors/admin.selectors';
import { defaultOpenValue, selectGym } from '@src/app/core/state/selectors/user.selectors';
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
  public selectedGym$: Observable<any> = this.storeUser$.pipe(select(selectGym));
  public defaultOpenValue: Observable<Date> = this.storeUser$.pipe(select(defaultOpenValue));
  public imgItem: Observable<any> = this.storeAdmin$.pipe(
    select(selectUnspalshEvents),
  );
  public searchForm: FormGroup;
  public updateGymForm: FormGroup;
  public gyms: Observable<any> = this.storeAdmin$.pipe(
    select(LoadedGymsEvents),
  );
  public checkAdminStatus: any = this.storeAdmin$.pipe(
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
  ) {
    this.storeAdmin$.dispatch(new LoadGymList());
  }
  public remove(event: any): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this gym',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzCancelText: 'No',
      nzOnOk: (): void => this.storeAdmin$.dispatch(new RemoveGym(event.id)),
    });
  }
  public showModal(resp: any): void {
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
    this.isVisible = false;
  }
  public handleOk(): void {
    let id: string;
    this.selectedId.subscribe((resp: string) => (id = resp)).unsubscribe();
    let picture: string;
    this.selectedPicture.subscribe(response => (picture = response)).unsubscribe();
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
    this.selectedGym$.subscribe((result: any) => {
      price = result.price;
      gymName = result.gymName;
    }).unsubscribe();
    const result = {
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
    this.isVisibleOrder = false;
  }
  public ngOnInit(): void {
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
      numberOfPeople: [, [Validators.required], this.maximumNumberPeopleValidator()],
    });
  }
  public openOrderWindow(gym: any): void {
    this.storeUser$.dispatch(new GettingInformationAboutTheSelectedGym(gym));
    this.isVisibleOrder = true;
  }
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
