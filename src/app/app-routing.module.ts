import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    // redirectTo: 'enroll-into-formation',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dettails/:item/:id',
    loadChildren: () => import('./dettails/dettails.module').then( m => m.DettailsPageModule)
  },
  {
    path: 'dettails/:id',
    loadChildren: () => import('./dettails/dettails.module').then( m => m.DettailsPageModule)
  },
  {
    path: 'enroll-into-formation/:id/:title/:image',
    loadChildren: () => import('./enroll-into-formation/enroll-into-formation.module').then( m => m.EnrollIntoFormationPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
  },
  {
    path: 'formation/:formationName',
    loadChildren: () => import('./formation/formation.module').then( m => m.FormationPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module').then( m => m.RecoverPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
