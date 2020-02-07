import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '' , redirectTo: '/home', pathMatch: 'full' },
  { path : 'home', loadChildren: './modules/home.module#HomeModule' },
  { path: 'login', loadChildren: './modules/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
