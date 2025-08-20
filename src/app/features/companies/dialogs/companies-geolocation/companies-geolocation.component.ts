import {Component, OnInit} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {environment} from '../../../../../environments/environment.development';

@Component({
  selector: 'app-companies-geolocation',
  imports: [],
  templateUrl: './companies-geolocation.component.html',
  styleUrl: './companies-geolocation.component.scss'
})
export class CompaniesGeolocationComponent implements OnInit {
    public map: mapboxgl.Map;
    public style = `mapbox://styles/mapbox/streets-v12`;
    public zoom = 14;

    ngOnInit() {
        this.initMap(Number(-87.0168141), Number(20.6991925));
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
