import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
    },

];
