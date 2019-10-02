/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'zcReverse' })
export class ZcReverse implements PipeTransform {

  /**
   * transform
   * 
   * @param value 
   */
  transform(value) {
    return value ? value.slice().reverse() : value;
  }

} 