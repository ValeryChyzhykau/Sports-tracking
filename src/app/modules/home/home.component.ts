import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAdmin } from '../../core/state/actions/admin.actions';
import { LoadReservationList } from '../../core/state/actions/user.actions';
import { StateAdmin } from '../../core/state/reducers/admin.reducers';
import { StateUser } from '../../core/state/reducers/user.reducers';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private storeAdmin$: Store<StateAdmin>, private storeUser$: Store<StateUser>) {}
  public ngOnInit(): void {
    this.storeUser$.dispatch(new LoadReservationList());
    this.storeAdmin$.dispatch(new LoadAdmin());
  }
}
