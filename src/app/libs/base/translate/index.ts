/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { ZcTranslate, ZcTranslateService, ZC_TRANSLATION_PROVIDER } from './translate';

@NgModule({
    declarations: [ZcTranslate],
    providers: [ZcTranslateService, ZC_TRANSLATION_PROVIDER],
    exports: [ZcTranslate]
})
export class ZcTranslateModule { }

export * from './translate';