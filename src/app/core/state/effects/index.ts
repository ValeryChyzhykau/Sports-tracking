import { AddNewGymEffect } from './add-new-gym.effect';
import { AddNewReservationEffect } from './add-new-reservation.effect';
import { DeleteGymEffect } from './delete-gym.effect';
import { DeleteReservationEffect } from './delete-reservation.effect';
import { LoadNewGymEffect } from './load-new-gym.effect';
import { LoadUnsplashImg } from './load-unsplash-img.effect';
import { LoginRedirectEffect } from './login-redirect.effect';
import { LoginEffects } from './login.effect';
import { LogoutEffect } from './logout.effect';
import { LoadReservationListEffect } from './reservation-list-load.effect';
import { SignUpRedirect } from './sign-up-redirect.effect';
import { SignUpEffect } from './sign-up.effect';
import { StateAdminEffect } from './state-admin.effect';
import { UpdateGymEffect } from './update-gym.effect';
import { UpdateReservationEffect } from './update-reservation.effect';

export const effects = [
    StateAdminEffect,
    LoginEffects,
    LogoutEffect,
    LoginRedirectEffect,
    LoadNewGymEffect,
    SignUpEffect,
    SignUpRedirect,
    DeleteGymEffect,
    LoadUnsplashImg,
    AddNewGymEffect,
    UpdateGymEffect,
    LoadReservationListEffect,
    AddNewReservationEffect,
    DeleteReservationEffect,
    UpdateReservationEffect,
];
