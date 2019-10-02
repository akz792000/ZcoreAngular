/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

/** Constructor */
export type Constructor<T> = new (...args: any[]) => T;

/**
 * decorate value to augment a directive with inputs and outputs.
 * 
 * @param value 
 * @param inputs 
 * @param outputs 
 */
export function decorate<T extends Constructor<{}>>(value: any, inputs, outputs: string[]): T {
    value.prototype.inputs = (value.prototype.inputs || []).concat(inputs);
    value.prototype.outputs = (value.prototype.outputs || []).concat(outputs);
    return value;
}