import { GymEffect } from './gym.effect';
import { ReservationEffect } from './reservation.effect';
import { AuthRedirectEffect } from './auth-redirect.effect';
import { AuthEffects } from './auth.effect';

export const effects = [
  AuthEffects,
  AuthRedirectEffect,
  GymEffect,
  ReservationEffect
];
