import { Routes } from '@angular/router';
import {DeclarationsDraftComponent} from '../declarations/pages/declarations-draft/declarations-draft.component';
import {
    DeclarationsPaymentReceiptComponent
} from '../declarations/pages/declarations-payment-receipt/declarations-payment-receipt.component';
import {
    DeclarationsAcceptedComponent
} from '../declarations/pages/declarations-accepted/declarations-accepted.component';
import {
    DeclarationsRejectedComponent
} from '../declarations/pages/declarations-rejected/declarations-rejected.component';
import {RequestsAcceptedComponent} from './pages/requests-accepted/requests-accepted.component';
import {RequestsRegistrationsComponent} from './pages/requests-registrations/requests-registrations.component';
import {RequestsRejectedComponent} from './pages/requests-rejected/requests-rejected.component';
import {RequestsUsersComponent} from './pages/requests-users/requests-users.component';


export default [
    {
        path: 'altas',
        component: RequestsRegistrationsComponent
    },
    {
        path: 'aceptadas',
        component: RequestsAcceptedComponent
    },
    {
        path: 'rechazadas',
        component: RequestsRejectedComponent
    },
    {
        path: 'usuarios',
        component: RequestsUsersComponent
    },
] as Routes;
