/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'zcKeys' })
export class ZcKeys implements PipeTransform {

  /**
   * transform
   * 
   * @param value 
   * @param args 
   */
  transform(value: string[], ...args: any[]): any {
    if (!value) return value;
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }

} 