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
import { RegisterComponent } from './register';

/*
 * route
 */
const routes: Routes = [{ path: '', component: RegisterComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterRoutingModule { }

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ZcModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule { }

export * from './register';
