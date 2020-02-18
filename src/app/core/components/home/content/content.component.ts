import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AddingNewPicture, GettingIdentifier, LoadGymList, RemoveGym, SearchImgUnsplash, UpdateGym } from '@src/app/core/state/actions/admin.actions';
import { StateAdmin } from '@src/app/core/state/reducers/admin.reducers';
import { LoadedGymsEvents, selectAdminStateEvents, selectedId, selectPicture, selectUnspalshEvents } from '@src/app/core/state/selectors/admin.selectors';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  public isVisible: boolean = false;
  public isVisibleSearch: boolean = false;
  public imgItem: Observable<any> = this.storeAdmin$.pipe(select(selectUnspalshEvents));
  public searchForm: FormGroup;
  public updateGymForm: FormGroup;
  public gyms: Observable<any> = this.storeAdmin$.pipe(select(LoadedGymsEvents));
  public checkAdminStatus: any = this.storeAdmin$.pipe(select(selectAdminStateEvents));
  public selectedPicture: Observable<string> = this.storeAdmin$.pipe(select(selectPicture));
  private selectedId: Observable<string> = this.storeAdmin$.pipe(select(selectedId));

  constructor(private storeAdmin$: Store<StateAdmin>, private fb: FormBuilder, private modalService: NzModalService) {}
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
      maximumNumberOfPeople: [resp.maximumNumberOfPeople, [Validators.required]],
      price: [resp.price, [Validators.required]],
    });
    this.storeAdmin$.dispatch( new AddingNewPicture(resp.img));
    this.isVisible = true;
  }
  public handleCancel(): void {
    this.isVisible = false;
  }
  public handleOk(): void {
    let id: string;
    this.selectedId.subscribe((resp: string) => id = resp);
    let picture: string;
    this.selectedPicture.subscribe((response) => picture = response);
    const result = {
      gymName: this.updateGymForm.controls.gymName.value,
      maximumNumberOfPeople: this.updateGymForm.controls.maximumNumberOfPeople.value,
      price: this.updateGymForm.controls.price.value,
      img: picture,
    };
    this.storeAdmin$.dispatch( new UpdateGym (id, result));
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
    this.storeAdmin$.dispatch(new SearchImgUnsplash( this.searchForm.controls.search.value));
  }
  public selectPicture(event: { srcElement: { src: string; }; }): void {
    this.storeAdmin$.dispatch(new AddingNewPicture(event.srcElement.src));
    this.isVisibleSearch = false;
  }
  public  ngOnInit(): void {
    this.storeAdmin$.dispatch(new LoadGymList());
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]],
    });
    this.updateGymForm = this.fb.group({
      gymName: ['', [Validators.required]],
      maximumNumberOfPeople: [0, [Validators.required]],
      price: [0, [Validators.required]],
    });
  }
  test(a){console.log(a.id);console.log(a.gymName)}

}
 