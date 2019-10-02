/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { ZcBarModule } from './bar';
import { ZcBaseModule } from './base';
import { ZcBoxModule } from './box';
import { ZcButtonModule } from './button';
import { ZcCalendarModule } from './calendar';
import { ZcDropdownModule } from './dropdown';
import { ZcImageModule } from './image';
import { ZcInputModule } from './input';
import { ZcLoadingModule } from './loading';
import { ZcMultiselectModule } from './multiselect';
import { ZcToggleModule } from './toggle';

const _ZC_MODULES = [
  ZcBarModule,
  ZcBaseModule,
  ZcBoxModule,
  ZcButtonModule,
  ZcCalendarModule,
  ZcDropdownModule,
  ZcImageModule,
  ZcInputModule,
  ZcLoadingModule,
  ZcMultiselectModule,
  ZcToggleModule
];

@NgModule({
  imports: _ZC_MODULES,
  exports: _ZC_MODULES
})
export class ZcModule { }

export * from './bar';
export * from './base';
export * from './box';
export * from './button';
export * from './calendar';
export * from './dropdown';
export * from './image';
export * from './input';
export * from './loading';
export * from './multiselect';
export * from './toggle';