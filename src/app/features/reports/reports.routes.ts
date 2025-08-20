import { Routes } from '@angular/router';
import {ReportsYearMonthComponent} from './pages/reports-year-month/reports-year-month.component';
import {CollectionReportComponent} from './pages/collection-report/collection-report.component';
export default [
    {
        path: 'ano-mes',
        component: ReportsYearMonthComponent
    },
    {
        path: 'recaudacion',
        component: CollectionReportComponent
    }
] as Routes;
