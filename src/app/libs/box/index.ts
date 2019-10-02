/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcBaseModule } from '../base';
import { ZcBox, ZcBoxService } from './box';

@NgModule({
    imports: [
        CommonModule,
        ZcBaseModule
    ],
    providers: [
        ZcBoxService
    ],
    declarations: [ZcBox],
    exports: [ZcBox]
})
export class ZcBoxModule { }

export * from './box';