import { LoginRedirectEffect } from './login-redirect.effect';
import { LoginEffects } from './login.effect';
import { LogoutEffect } from './logout.effect';
import { SignUpRedirect } from './sign-up-redirect.effect';
import { SignUpEffect } from './sign-up.effect';

export const effects = [ LoginEffects, LogoutEffect, LoginRedirectEffect, SignUpEffect, SignUpRedirect ];
