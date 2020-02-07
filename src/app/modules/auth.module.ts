import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { RouterModule, Routes } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../core/components/auth/login/login.component';
import { AuthService } from '../core/services/auth.service';
import { SharedModule } from './shared.module';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { en_US, NZ_I18N } from 'ng-zorro-antd';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key],
);
registerLocaleData(en);

const routes: Routes = [{ path: '', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireFunctionsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ScrollingModule,
    DragDropModule,
    NgZorroAntdModule,
    NzFormModule,
  ],
  providers: [
    AuthService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
})
export class AuthModule {}
