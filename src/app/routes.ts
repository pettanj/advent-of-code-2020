import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { dayRoutes } from './days/routes';

export const mainRoutes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    children: dayRoutes
  }
];
