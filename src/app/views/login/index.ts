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
import { LoginComponent } from './login';

const routes: Routes = [{ path: '', component: LoginComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule { }

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ZcModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }

export * from './login';
