import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { LogOut } from '../../state/actions/auth.actions';
import { AuthState } from '../../state/reducers/auth.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public store: Store<AuthState>, public service: AuthService) { }
  test () {
     this.store.dispatch(new LogOut());
  }
  ngOnInit() {
  }

}
