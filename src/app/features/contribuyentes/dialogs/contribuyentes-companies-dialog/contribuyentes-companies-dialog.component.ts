import {Component, inject, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {TableSkeletonComponent} from '../../../../shared/components/skeleton/table-skeleton/table-skeleton.component';

@Component({
  selector: 'app-contribuyentes-companies-dialog',
  imports: [
      TableModule,
      TableSkeletonComponent
  ],
  templateUrl: './contribuyentes-companies-dialog.component.html',
  styleUrl: './contribuyentes-companies-dialog.component.scss'
})
export class ContribuyentesCompaniesDialogComponent implements OnInit {

    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public contribuyente: any;
    public isLoading: boolean = false;

    ngOnInit(): void {
        this.contribuyente = this.dialogConfig.data.contribuyente;
    }
}
