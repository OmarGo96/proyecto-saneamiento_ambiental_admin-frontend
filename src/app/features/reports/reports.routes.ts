import {Routes} from '@angular/router';
import {ReportsYearMonthComponent} from './pages/reports-year-month/reports-year-month.component';
import {CollectionReportComponent} from './pages/collection-report/collection-report.component';
import {HotelAnnualOccupancyComponent} from './pages/hotel-annual-occupancy/hotel-annual-occupancy.component';
import {HotelMonthlyOccupancyComponent} from './pages/hotel-monthly-occupancy/hotel-monthly-occupancy.component';
import {StatementsByCompanyComponent} from './pages/statements-by-company/statements-by-company.component';
import {HotelsWithoutStatementsComponent} from './pages/hotels-without-statements/hotels-without-statements.component';
import {CompanyComplianceComponent} from './pages/company-compliance/company-compliance.component';
import { ConcilationReportComponent } from './pages/concilation-report/concilation-report.component';

export default [
    {
        path: 'ano-mes',
        component: ReportsYearMonthComponent
    },
    {
        path: 'recaudacion',
        component: CollectionReportComponent
    },
    {
        path: 'ocupacion-hotelera-anual',
        component: HotelAnnualOccupancyComponent
    },
    {
        path: 'ocupacion-hotelera-mensual',
        component: HotelMonthlyOccupancyComponent
    },
    {
        path: 'declaraciones-pagadas',
        component: StatementsByCompanyComponent
    },
    {
        path: 'hoteles-sin-declarar',
        component: HotelsWithoutStatementsComponent
    },
    {
        path: 'cumplimiento-por-empresas',
        component: CompanyComplianceComponent
    },
    {
        path: 'conciliacion',
        component: ConcilationReportComponent
    }
] as Routes;
