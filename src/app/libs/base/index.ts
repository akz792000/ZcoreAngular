/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { ZcKeysModule } from './keys';
import { ZcReverseModule } from './reverse';
import { ZcHintModule } from './hint';
import { ZcTranslateModule } from './translate';
import { ZcMaskModule } from './mask';

const _ZC_BASE_MODULES = [
  ZcKeysModule,
  ZcReverseModule,
  ZcHintModule,
  ZcTranslateModule,
  ZcMaskModule
];

@NgModule({
  imports: _ZC_BASE_MODULES,
  exports: _ZC_BASE_MODULES
})
export class ZcBaseModule { }

export * from './enums';
export * from './utils';
export * from './translate';
export * from './keys';
export * from './reverse';
export * from './hint';
export * from './commons';
export * from './mask';