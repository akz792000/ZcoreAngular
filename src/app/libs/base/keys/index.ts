/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { ZcKeys } from './keys';

@NgModule({
    declarations: [ZcKeys],
    exports: [ZcKeys]
})
export class ZcKeysModule { }

export * from './keys';