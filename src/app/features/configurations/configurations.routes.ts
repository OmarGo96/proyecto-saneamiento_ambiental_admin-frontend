import { Routes } from '@angular/router';
import {OpeningStatementsComponent} from './pages/opening-statements/opening-statements.component';
import {OpeningByCompanyComponent} from './pages/opening-by-company/opening-by-company.component';
import {UpdateCollectionComponent} from './pages/update-collection/update-collection.component';
export default [
    {
        path: 'actualizar-recaudacion',
        component: UpdateCollectionComponent
    },
    {
        path: 'apertura-declaraciones',
        component: OpeningStatementsComponent
    },
    {
        path: 'apertura-empresa',
        component: OpeningByCompanyComponent
    }
] as Routes;
