import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../core/components/home/home.component';
import { AuthGuard } from '../core/guards/auth-guard';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [AuthGuard] }];

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
  entryComponents: [],
})
export class HomeModule {}
