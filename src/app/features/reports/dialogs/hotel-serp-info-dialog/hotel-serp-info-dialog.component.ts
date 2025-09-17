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

    public serpInfo = {
        ok: true,
        data: {
            web_url: "https://www.barcelo.com/en-us/occidental-at-xcaret-destination/?utm_source=google&utm_medium=or…",
            address: "Camino a Xcaret Carretera Federal Chetumal - Puerto, Avenida Benito Juárez, 282, 77710 Playa del Carmen, Q.R., Mexico",
            hotel_class: "5-star hotel",
            market_offer: [
                {
                    source: "Expedia.com",
                    rooms: 7
                },
                {
                    source: "Hotels.com",
                    rooms: 7
                },
                {
                    source: "Travelocity.com",
                    rooms: 7
                },
                {
                    source: "Barcelo.com",
                    rooms: 7
                }
            ]
        }
    }

    ngOnInit() {
        this.company = this.dialogConfig.data.company;
    }


}
