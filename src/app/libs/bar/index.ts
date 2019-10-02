/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcBaseModule} from '../base';
import { ZcBar, ZcBarService } from './bar';

@NgModule({
    imports: [
        CommonModule,
        ZcBaseModule
    ],
    providers: [
        ZcBarService
    ],    
    declarations: [ZcBar],
    exports: [ZcBar]
})
export class ZcBarModule { }

export * from './bar';