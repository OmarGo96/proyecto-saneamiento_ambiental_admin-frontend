import { Routes } from '@angular/router';
import {DeclarationsDraftComponent} from './pages/declarations-draft/declarations-draft.component';
import {DeclarationsAcceptedComponent} from './pages/declarations-accepted/declarations-accepted.component';
import {DeclarationsRejectedComponent} from './pages/declarations-rejected/declarations-rejected.component';
import {DeclarationsDetailsComponent} from './pages/declarations-details/declarations-details.component';
import {
    DeclarationsPaymentReceiptComponent
} from './pages/declarations-payment-receipt/declarations-payment-receipt.component';


export default [
    {
        path: 'borradores',
        component: DeclarationsDraftComponent
    },
    {
        path: 'pase-caja',
        component: DeclarationsPaymentReceiptComponent
    },
    {
        path: 'aceptadas',
        component: DeclarationsAcceptedComponent
    },
    {
        path: 'rechazadas',
        component: DeclarationsRejectedComponent
    },
    {
        path: 'detalle',
        component: DeclarationsDetailsComponent
    }
] as Routes;
