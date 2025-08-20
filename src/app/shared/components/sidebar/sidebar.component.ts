import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItems} from '../../../core/constants/menu-items';
import {PanelModule} from 'primeng/panel';
import {PanelMenu, PanelMenuModule} from 'primeng/panelmenu';
import {Ripple, RippleModule} from 'primeng/ripple';
import {DrawerModule} from 'primeng/drawer';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {StyleClass} from 'primeng/styleclass';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-sidebar',
    imports: [
        PanelMenuModule,
        RippleModule,
        RouterLink,
        RouterLinkActive,
        DrawerModule,
        ButtonModule,
        AvatarModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {


    public menuItems: any;
    public menu: any;

    public profile: any;

    public activeItem: any;

    ngOnInit() {

        this.menuItems = MenuItems.filter(menuItem => menuItem);

        const groups = new Set(this.menuItems.map((item: any) => item.group));

        this.menu = [];
        groups.forEach(g =>
            this.menu.push({
                    name: g,
                    values: this.menuItems.filter((i: any) => i.group === g),
                    module: ''
                }
            ));

        for (let i = 0; i < this.menu.length; i++) {
            for (let j = 0; j < this.menu[i].values.length; j++) {
                this.menu[i].module = this.menu[i].values[j].module;
            }
        }
    }

    toggle(itemName: string) {
        console.log(itemName);
        this.activeItem = this.activeItem === itemName ? null : itemName;
    }
}
