import { Routes } from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'auth', loadChildren: () => import('./features/auth/auth.routes')
            },
            {path: '', pathMatch: 'full', redirectTo: 'auth/login'}
        ],
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '', loadChildren: () => import('./features/features.routes')
            },
        ],
    },
    {path: '**', redirectTo: 'auth/login'} // TODO: Redirigir a PageNotFound
];
