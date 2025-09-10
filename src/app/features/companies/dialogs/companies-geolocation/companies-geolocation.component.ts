import {Component, inject, OnInit} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {environment} from '../../../../../environments/environment.development';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-companies-geolocation',
  imports: [],
  templateUrl: './companies-geolocation.component.html',
  styleUrl: './companies-geolocation.component.scss'
})
export class CompaniesGeolocationComponent implements OnInit {

    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);

    public map: mapboxgl.Map;
    public style = `mapbox://styles/mapbox/streets-v12`;
    public zoom = 14;



    ngOnInit() {
        const company = this.dialogConfig.data.company;

        this.initMap(Number(company.longitude), Number(company.latitude));
    }

    initMap(lng: any, lat: any) {
        if (this.map){
            this.map.remove();
        }

        this.map = new mapboxgl.Map({
            accessToken: environment.mapboxToken,
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [lng, lat]
        });

        this.map.addControl(new mapboxgl.NavigationControl());
        // Se agrega metodo resize para cargar completamente el mapa
        this.map.on('load', () => {
            this.map.resize();
        });
        this.buildMarker(lng, lat)
    }

    buildMarker(lng: any, lat: any) {
        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([lng, lat]).addTo(this.map);

        marker.on('dragend', () => {
            console.log(marker.getLngLat().lng, marker.getLngLat().lat);
        });
    }
}
