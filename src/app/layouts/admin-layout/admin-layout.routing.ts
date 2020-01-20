import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { FloorComponent } from '../../pages/floor/floor.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'home',      component: HomeComponent },
    { path: 'building/:buildingId',      component: FloorComponent },


  
];
