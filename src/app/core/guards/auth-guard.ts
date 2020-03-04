import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  public canActivate(): Observable<boolean> | boolean {
    const check = this.authService.checkStatus();
    return check.pipe(
      map((data: boolean) => {
        if (!data) {
          this.router.navigate(['/login']);
        }
        return data;
      })
    );
  }
}
