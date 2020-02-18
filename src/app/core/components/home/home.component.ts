import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAdmin } from '../../state/actions/admin.actions';
import { StateAdmin } from '../../state/reducers/admin.reducers';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private storeAdmin$: Store<StateAdmin>) {}
  public  ngOnInit(): void {
    this.storeAdmin$.dispatch(new LoadAdmin());
  }
}
