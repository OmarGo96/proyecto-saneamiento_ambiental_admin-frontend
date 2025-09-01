import {Component, inject, OnInit} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DecimalPipe, PercentPipe} from '@angular/common';

@Component({
  selector: 'app-annual-growth',
    imports: [
        CardModule,
        ButtonModule,
        PercentPipe,
        DecimalPipe
    ],
  templateUrl: './annual-growth.component.html',
  styleUrl: './annual-growth.component.scss'
})
export class AnnualGrowthComponent implements OnInit {

    private reportsService = inject(ReportsService);


    public statements: any;
    public taxpayers: any;
    public companies: any;

    ngOnInit() {
        this.reportsService.getAnnualGrowth().subscribe({
            next: data => {
                this.statements = data.statements;
                this.taxpayers = data.taxpayers;
                this.companies = data.companies;
            },
            error: err => {


            }
        })
    }


}
