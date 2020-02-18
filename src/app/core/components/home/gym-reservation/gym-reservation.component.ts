import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserService } from '@src/app/core/services/user.service';
import { AuthState } from '@src/app/core/state/reducers/auth.reducers';
import { selectAuthEmailEvents } from '@src/app/core/state/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: "app-gym-reservation",
  templateUrl: "./gym-reservation.component.html",
  styleUrls: ["./gym-reservation.component.scss"]
})
export class GymReservationComponent implements OnInit {
  public email$: Observable<any> = this.store$.pipe(select(selectAuthEmailEvents));

   constructor(private store$: Store<AuthState>, private userService: UserService) {}
  ngOnInit() {
    let email: string;
    this.email$.subscribe((result: string) => email = result);
    this.userService.getReservation().subscribe((res) => console.log(res));
  }
}
