import { Routes } from '@angular/router';
import { checkCodeGuard } from './guards/check-code.guard';
import { HomeComponent } from './pages/home/home.component';
import { CodeAccessPageComponent } from './pages/code-access-page/code-access-page.component';
import { FormsComponent } from './pages/forms/forms.component';
import { redirectGuard } from './guards/redirect.guard';
import { F1Component } from './pages/forms/fomularios/f1/f1.component';
import { F2Component } from './pages/forms/fomularios/f2/f2.component';
import { F3Component } from './pages/forms/fomularios/f3/f3.component';
import { F3AComponent } from './pages/forms/fomularios/f3-a/f3-a.component';
import { FormLayoutComponent } from './pages/forms/form-layout/form-layout.component';
import { F4Component } from './pages/forms/fomularios/f4/f4.component';
import { F5Component } from './pages/forms/fomularios/f5/f5.component';
import { F6Component } from './pages/forms/fomularios/f6/f6.component';
import { F7Component } from './pages/forms/fomularios/f7/f7.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [checkCodeGuard],
  },
  // {
  //   path: 'code',
  //   canActivate: [redirectGuard],
  //   component: CodeAccessPageComponent,
  // },
  {
    path: 'forms',
    component: FormsComponent,
    children: [],
  },
  {
    path: 'form',
    component: FormLayoutComponent,
    children: [
      {
        path: 'F1/:id',
        component: F1Component,
      },
      {
        path: 'F2/:id',
        component: F2Component,
      },
      {
        path: 'F3/:id',
        component: F3Component,
      },
      {
        path: 'F3A/:id',
        component: F3AComponent,
      },
      {
        path: 'F4/:id',
        component: F4Component,
      },
      {
        path: 'F5/:id',
        component: F5Component,
      },
      {
        path: 'F6/:id',
        component: F6Component,
      },
      {
        path: 'F7/:id',
        component: F7Component,
      },
    ],
  },
];
