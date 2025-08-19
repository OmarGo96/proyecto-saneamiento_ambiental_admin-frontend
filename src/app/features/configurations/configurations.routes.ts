import { Routes } from '@angular/router';
import {OpeningStatementsComponent} from './pages/opening-statements/opening-statements.component';
import {OpeningByCompanyComponent} from './pages/opening-by-company/opening-by-company.component';
export default [
    {
        path: 'apertura-declaraciones',
        component: OpeningStatementsComponent
    },
    {
        path: 'apertura-empresa',
        component: OpeningByCompanyComponent
    }
] as Routes;
