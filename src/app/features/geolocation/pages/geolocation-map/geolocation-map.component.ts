import {Component, inject, OnInit} from '@angular/core';
import {GeolocationService} from '../../services/geolocation.service';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../../environments/environment.development';
import {NgxSpinnerService} from 'ngx-spinner';
import {forkJoin} from 'rxjs';
import {AlertsService} from '../../../../core/services/alerts.service';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-geolocation-map',
    imports: [],
    providers: [AlertsService, ConfirmationService],
    templateUrl: './geolocation-map.component.html',
    styleUrl: './geolocation-map.component.scss'
})
export class GeolocationMapComponent implements OnInit {

    private geolocationService = inject(GeolocationService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);

    public map: mapboxgl.Map;
    public style = `mapbox://styles/mapbox/streets-v12`;
    public zoom = 10;


    public companiesFeatures: any[] = [];

    ngOnInit() {
        forkJoin({
            companies: this.geolocationService.getCompaniesGeolocation()
        }).subscribe({
            next: ({companies}) => {
                this.initMap(Number(-87.1800222), Number(20.5653963));
                for (let feature of companies.companies) {
                    this.companiesFeatures.push(
                        {
                            geometry: {
                                type: "Point",
                                coordinates: [Number(feature.longitude), Number(feature.latitude)],
                            },
                            type: "Feature",
                            properties: {
                                habitaciones: feature.habitaciones,
                                description: feature.nombre_establecimiento,
                                licencia: feature.licencia_funcionamiento_id
                            }
                        },
                    );
                }
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getGeolocation() {
        this.spinner.show();
        this.geolocationService.getCompaniesGeolocation().subscribe({
            next: data => {


                this.spinner.hide();
            },
            error: err => {
                console.log(err);
            }
        })
    }

    initMap(lng: any, lat: any) {
        if (this.map) {
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
            this.map.addSource('companies-location', {
                type: 'geojson',
                generateId: true,
                data: {
                    type: 'FeatureCollection',
                    features: this.companiesFeatures
                }
            });

            // AGREGAR LA CAPA PARA VISUALIZAR LOS PUNTOS
            this.map.addLayer({
                id: 'companies-points',
                type: 'circle',
                source: 'companies-location',
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#A10046',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff'
                }
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            this.map.addInteraction('companies-click-interaction', {
                type: 'click',
                target: {layerId: 'companies-points'},
                handler: (e) => {
                    // Copy coordinates array.
                    const coordinates: any = [e.lngLat.lng, e.lngLat.lat];
                    const description: any = `<h1 class='font-bold'>${e.feature?.properties['description']}</h1> <br> <span>Licencia funcionamiento: ${e.feature?.properties['licencia']}</span> <br> <span>Habitaciones ${e.feature?.properties['habitaciones']}</span>`;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(description)
                        .addTo(this.map);
                }
            });

            // Change the cursor to a pointer when the mouse is over a POI.
            this.map.addInteraction('places-mouseenter-interaction', {
                type: 'mouseenter',
                target: {layerId: 'companies-points'},
                handler: () => {
                    this.map.getCanvas().style.cursor = 'pointer';
                }
            });

            // Change the cursor back to a pointer when it stops hovering over a POI.
            this.map.addInteraction('places-mouseleave-interaction', {
                type: 'mouseleave',
                target: {layerId: 'companies-points'},
                handler: () => {
                    this.map.getCanvas().style.cursor = '';
                }
            });

            this.map.resize();
        });


    }

    buildMarker(lng: any, lat: any) {
        const marker = new mapboxgl.Marker({
            draggable: false
        }).setLngLat([lng, lat]).addTo(this.map);
    }
}
