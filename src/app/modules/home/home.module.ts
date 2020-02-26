import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { AuthGuard } from '@core/guards/auth-guard';
import { AdminService } from '@core/services/admin.service';
import { HeaderComponent } from '@src/app/modules/home/components/header/header.component';
import { HomeComponent } from '@src/app/modules/home/home.component';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
  { path: 'content', component: ContentComponent },
  { path: 'reservation', component: GymReservationComponent },
] }];

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { en_US, NZ_I18N } from 'ng-zorro-antd';
import { UserService } from '../../core/services/user.service';
import { SharedModule } from '../shared.module';
import { ContentComponent } from './components/content/content.component';
import { GymReservationComponent } from './components/gym-reservation/gym-reservation.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

@NgModule({
  declarations: [ HomeComponent, HeaderComponent, ContentComponent, GymReservationComponent ],
  imports: [
    ScrollingModule,
    DragDropModule,
    RouterModule.forChild(routes),
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [ AdminService, UserService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    ],
})
export class HomeModule {}
