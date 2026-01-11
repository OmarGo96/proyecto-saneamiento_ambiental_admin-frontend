import {ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {jwtInterceptor} from './core/interceptors/jwt.interceptor';
import {DsaTheme} from './core/constants/theme-presets/dsa-theme';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';

registerLocaleData(localeEs)

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: DsaTheme,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'light',
                    cssLayer: false
                }
            }
        }),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([jwtInterceptor])),
        {provide: LOCALE_ID, useValue: 'es-MX'},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN'},
        {provide: APP_BASE_HREF, useFactory: () => document.querySelector('base')?.getAttribute('href') ?? '/'}
    ]
};
