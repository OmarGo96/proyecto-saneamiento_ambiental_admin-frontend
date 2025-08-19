import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [
      ButtonModule,
      MenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    private router = inject(Router)
    public items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Menu',
                items: [
                    {
                        label: 'Cerrar sesión',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            sessionStorage.clear();
                            this.router.navigate(['auth/login']);
                        }
                    }
                ]
            }
        ];
    }
}
