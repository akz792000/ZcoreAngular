/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { ZcHint } from './hint';

@NgModule({
    declarations: [ZcHint],
    exports: [ZcHint]
})
export class ZcHintModule { }

export * from './hint';