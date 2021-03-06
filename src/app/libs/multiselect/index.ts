/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ZcBaseModule } from '../base';
import { ZcMultiselect } from './multiselect';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ZcBaseModule
    ],
    declarations: [ZcMultiselect],
    exports: [ZcMultiselect]
})
export class ZcMultiselectModule { }

export * from './multiselect';