import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      // SeoService reads the active route at bootstrap; blocking initial
      // navigation guarantees a route is resolved by the time it looks.
      withEnabledBlockingInitialNavigation(),
    ),
    provideClientHydration(withEventReplay()),
  ]
};
