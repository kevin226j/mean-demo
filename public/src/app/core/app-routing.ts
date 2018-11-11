import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from '../home/home.component';
import {PortfolioComponent} from '../portfolio/portfolio.component';
import {GridPhotosComponent} from '../portfolio/components/grid-photos/grid-photos.component';
import {LoginComponent} from '../core/login/login.component';
import {AdminComponent} from '../admin/admin.component';
import { _401Component } from './redirects/401.component';
import { _404Component } from './redirects/404.component';
import { AuthGuard } from '../core/guards/auth.guard';


const ROUTES : Routes = [
    {path : '', redirectTo: 'login', pathMatch : 'full'}, 
    {path: 'login', component : LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard]},
    {path: 'portfolio/:id', component: GridPhotosComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component : AdminComponent, canActivate: [AuthGuard]},
    {path: 'error', component: _401Component},    
    {path : '**', component: _404Component},
]

@NgModule({
    exports: [RouterModule],
    imports : [RouterModule.forRoot(ROUTES)]
})

export class AppRoutingModule {}