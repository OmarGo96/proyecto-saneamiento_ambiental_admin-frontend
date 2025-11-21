import { Routes } from '@angular/router';
import {CompaniesListComponent} from './pages/companies-list/companies-list.component';
import {
    CompaniesWithoutRepresentativeComponent
} from './pages/companies-without-representative/companies-without-representative.component';
import {
    CompaniesWithRepresentativeComponent
} from './pages/companies-with-representative/companies-with-representative.component';
import {CompaniesRegistrationComponent} from './pages/companies-registration/companies-registration.component';
import {DeclarationsDetailsComponent} from '../declarations/pages/declarations-details/declarations-details.component';
import {CompaniesDetailComponent} from './pages/companies-detail/companies-detail.component';
import {CompaniesFilesComponent} from './pages/companies-files/companies-files.component';

export default [
    {
        path: 'todas',
        component: CompaniesListComponent
    },
    {
        path: 'sin-representante',
        component: CompaniesWithoutRepresentativeComponent
    },
    {
        path: 'con-representante',
        component: CompaniesWithRepresentativeComponent
    },
    {
        path: 'alta',
        component: CompaniesRegistrationComponent
    },
    {
        path: 'detalle',
        component: CompaniesDetailComponent
    },
    {
        path: 'documentos/:companyId',
        component: CompaniesFilesComponent
    }

] as Routes;
