/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { ZcMask } from './mask';

@NgModule({
    declarations: [ZcMask],
    exports: [ZcMask]
})
export class ZcMaskModule { }

export * from './mask';