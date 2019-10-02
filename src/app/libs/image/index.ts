/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcImage } from './image';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ZcImage],
    exports: [ZcImage]
})
export class ZcImageModule { }

export * from './image';