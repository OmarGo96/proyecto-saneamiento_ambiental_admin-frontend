import {Routes} from '@angular/router';
import {ReportsYearMonthComponent} from './pages/reports-year-month/reports-year-month.component';
import {CollectionReportComponent} from './pages/collection-report/collection-report.component';
import {AnnualGrowthComponent} from './pages/annual-growth/annual-growth.component';
import {HotelAnnualOccupancyComponent} from './pages/hotel-annual-occupancy/hotel-annual-occupancy.component';
import {HotelMonthlyOccupancyComponent} from './pages/hotel-monthly-occupancy/hotel-monthly-occupancy.component';
import {StatementsByCompanyComponent} from './pages/statements-by-company/statements-by-company.component';
import {HotelsWithoutStatementsComponent} from './pages/hotels-without-statements/hotels-without-statements.component';
import {CompanyComplianceComponent} from './pages/company-compliance/company-compliance.component';

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
        path: 'crecimiento-anual',
        component: AnnualGrowthComponent
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
        path: 'hoteles-sin-pagar',
        component: HotelsWithoutStatementsComponent
    },
    {
        path: 'cumplimiento-por-empresas',
        component: CompanyComplianceComponent
    }
] as Routes;
