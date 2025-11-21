import {Component, inject, Input} from '@angular/core';
import {CompaniesService} from '../../services/companies.service';
import {Button} from 'primeng/button';
import {CompaniesStatus} from '../../constants/companies-status';

@Component({
  selector: 'app-companies-files',
    imports: [
        Button
    ],
  templateUrl: './companies-files.component.html',
  styleUrl: './companies-files.component.scss'
})
export class CompaniesFilesComponent {

    @Input() companyId: any;

    private companiesService = inject(CompaniesService);

    ngOnInit() {
       this.getCompaniesFiles();
    }

    getCompaniesFiles() {
        this.companiesService.getCompaniesFiles(this.companyId).subscribe({
            next: data => {

            },
            error: err => {

            }
        })
    }

    protected readonly companiesStatus = CompaniesStatus;
}
