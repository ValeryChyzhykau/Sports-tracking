import { AddNewGymEffect } from './add-new-gym.effect';
import { DeleteGymEffect } from './delete-gym.effect';
import { LoadNewGymEffect } from './load-new-gym.effect';
import { LoadUnsplashImg } from './load-unsplash-img.effect';
import { LoginRedirectEffect } from './login-redirect.effect';
import { LoginEffects } from './login.effect';
import { LogoutEffect } from './logout.effect';
import { SignUpRedirect } from './sign-up-redirect.effect';
import { SignUpEffect } from './sign-up.effect';
import { StateAdminEffect } from './state-admin.effect';
import { UpdateGymEffect } from './update-gym.effect';

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
];
