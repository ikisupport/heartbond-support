import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'HeartBond Support: heart rate graphing for iPhone, iPad, and Mac',
    data: {
      description:
        'Support for HeartBond, a heart rate graphing app for iPhone, iPad, and Mac. Reads Apple Health, draws days of heart rate in five-minute bins, and syncs your downloaded days through your own iCloud account.'
    }
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
    title: 'Getting started | HeartBond',
    data: {
      description:
        'How to start with HeartBond: allow access to Apple Health, download days, let iCloud carry them to your other devices, and optionally keep every sample on a day.'
    }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Privacy Policy | HeartBond',
    data: {
      description:
        'HeartBond reads heart rate and HRV from Apple Health with your consent and keeps your downloaded days in your own iCloud account. There is no HeartBond account and no HeartBond server holding your health data.'
    }
  },
  {
    path: 'terms',
    component: TermsComponent,
    title: 'Terms of Service | HeartBond',
    data: {
      description:
        'Terms of service for HeartBond. The app graphs heart rate for personal tracking, is not a medical device, and defaults to High–low five-minute bins unless you keep all samples on a day.'
    }
  },
  { path: '404', component: NotFoundComponent, title: 'Page not found | HeartBond' },
  { path: '**', component: NotFoundComponent, title: 'Page not found | HeartBond' },
];
