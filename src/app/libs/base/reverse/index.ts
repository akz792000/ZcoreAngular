/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { ZcReverse } from './reverse';

@NgModule({
    declarations: [ZcReverse],
    exports: [ZcReverse]
})
export class ZcReverseModule { }

export * from './reverse';