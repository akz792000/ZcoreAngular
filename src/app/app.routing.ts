/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';

const appRoutes: Routes = [
  { path: '', loadChildren: './views/home/index#HomeModule', canActivate: [AuthorizationService] },
  { path: 'login', loadChildren: './views/login/index#LoginModule' },
  { path: 'register', loadChildren: './views/register/index#RegisterModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }