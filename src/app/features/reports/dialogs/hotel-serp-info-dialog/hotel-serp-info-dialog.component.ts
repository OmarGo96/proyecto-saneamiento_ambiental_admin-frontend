import {Component, inject, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-hotel-serp-info-dialog',
  imports: [
      TableModule,
      ButtonModule
  ],
  templateUrl: './hotel-serp-info-dialog.component.html',
  styleUrl: './hotel-serp-info-dialog.component.scss'
})
export class HotelSerpInfoDialogComponent implements OnInit {

    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public company: any;

    public serpInfo: any;

    ngOnInit() {
        this.company = this.dialogConfig.data.company;
        this.serpInfo = this.dialogConfig.data.serp_info;
    }


}
