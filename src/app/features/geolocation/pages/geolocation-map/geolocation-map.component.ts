import {Component, inject, OnInit} from '@angular/core';
import {GeolocationService} from '../../services/geolocation.service';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../../environments/environment.development';
import {NgxSpinnerService} from 'ngx-spinner';
import {forkJoin} from 'rxjs';
import {AlertsService} from '../../../../core/services/alerts.service';
import {ConfirmationService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-geolocation-map',
    imports: [
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        ButtonModule,
        FormsModule
    ],
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

    public companies: any;
    public companiesFeatures: any[] = [];

    public value: string;

    ngOnInit() {
        this.loadingInitialData();
    }

    loadingInitialData(){
        forkJoin({
            companies: this.geolocationService.getCompaniesGeolocation()
        }).subscribe({
            next: ({companies}) => {
                this.companies = companies.companies;
                this.value = '';
                this.zoom = 10;
                this.initMap(Number(-87.1800222), Number(20.5653963), 6);
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

    searchCompany(){
        this.companiesFeatures = [];
        this.zoom = 13;
        const filteredResult = this.companies.find((company: any) => company.licencia_funcionamiento_id == this.value);
        this.initMap(Number(filteredResult.longitude), Number(filteredResult.latitude), 10);
        this.companiesFeatures.push(
            {
                geometry: {
                    type: "Point",
                    coordinates: [Number(filteredResult.longitude), Number(filteredResult.latitude)],
                },
                type: "Feature",
                properties: {
                    habitaciones: filteredResult.habitaciones,
                    description: filteredResult.nombre_establecimiento,
                    licencia: filteredResult.licencia_funcionamiento_id
                }
            },
        );
    }

    initMap(lng: any, lat: any, pointer: any) {
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
                    'circle-radius': pointer,
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
}
