import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const DsaTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '#f8f6f2',
            100: '#eee7da',
            200: '#dfd0b5',
            300: '#cdb188',
            400: '#ba9865',
            500: '#99825d', // color base
            600: '#7d6b4b',
            700: '#64563c',
            800: '#4e412e',
            900: '#3c3123',
            950: '#231b12'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#99825d',
                    inverseColor: '#ffffff',
                    hoverColor: '#7d6b4b',
                    activeColor: '#7d6b4b'
                }
            }
        }
    }
});
