/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

export class ZcStringUtils {

    /**
     * String is empty or not.
     * 
     * @param value 
     */
    public static isEmpty(value: string) {
        return (!value || value == undefined || value == "" || value.length == 0)
    }

}