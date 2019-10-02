/**
 * 
 * @author Ali Karimizandi
 * @since 2017 
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ZcModule } from '../../libs';
import { HomeComponent } from './home';

const routes: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ZcModule,
        HomeRoutingModule
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }

export * from './home';