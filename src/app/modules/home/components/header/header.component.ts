import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  AddingNewPictureAction,
  CreateNewGymAction,
  SearchImgUnsplashAction
} from '@src/app/core/state/actions/admin.actions';
import { LogOutAction } from '@src/app/core/state/actions/auth.actions';
import { StateAdmin } from '@src/app/core/state/reducers/admin.reducers';
import { AuthState } from '@src/app/core/state/reducers/auth.reducers';
import {
  selectAdminStateEvents,
  selectPicture,
  selectUnspalshEvents
} from '@src/app/core/state/selectors/admin.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public imgItem: Observable<string[]> = this.storeAdmin$.pipe(
    select(selectUnspalshEvents)
  );
  public selectedPicture: Observable<string> = this.storeAdmin$.pipe(
    select(selectPicture)
  );
  public checkAdminStatus: Observable<boolean> = this.storeAdmin$.pipe(
    select(selectAdminStateEvents)
  );
  public searchForm: FormGroup;
  public addNewGymForm: FormGroup;
  public isVisible: boolean;
  public isVisibleSearch: boolean;
  constructor(
    private store$: Store<AuthState>,
    private fb: FormBuilder,
    private storeAdmin$: Store<StateAdmin>
  ) {}

  public logout(): void {
    this.store$.dispatch(new LogOutAction());
  }

  public ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]]
    });
    this.addNewGymForm = this.fb.group({
      gymName: ['', [Validators.required]],
      maximumNumberOfPeople: [0, [Validators.required]],
      price: [0, [Validators.required]]
    });
  }

  public search(): void {
    this.storeAdmin$.dispatch(
      new SearchImgUnsplashAction(this.searchForm.controls.search.value)
    );
  }

  public selectPicture(event: { srcElement: { src: string } }): void {
    this.storeAdmin$.dispatch(new AddingNewPictureAction(event.srcElement.src));
    this.isVisibleSearch = false;
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public openSearchWindow(): void {
    this.isVisibleSearch = true;
  }

  public cancel(): void {
    this.isVisibleSearch = false;
  }

  public handleOk(): void {
    let {
      gymName,
      maximumNumberOfPeople,
      price,
      picture
    } = this.addNewGymForm.value;
    this.selectedPicture.subscribe((response: string) => (picture = response));

    this.storeAdmin$.dispatch(
      new CreateNewGymAction({
        gymName,
        maximumNumberOfPeople,
        price,
        img: picture
      })
    );
    this.isVisible = false;
  }

  public handleCancel(): void {
    this.isVisible = false;
  }
}
