/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, forwardRef } from "@angular/core";
import { Constructor, mixinZcBase, mixinZcValue, mixinZcMask, decorate } from "../base";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** Interface */
export interface _ZcInput {
  type: string;
  size: number;
  maxlength: number;
}

/** Mixin to augment a directive. */
export const mixinZcInput = function <T extends Constructor<{}>>(base: T): Constructor<_ZcInput> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ["type", "size", "maxlength"],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _type: string = "text";
    private _size: number;
    private _maxlength: number;

    /** The type of the element. */
    get type() { return this._type; }
    set type(value: string) { this._type = value; }

    /** The size of the element. */
    get size() { return this._size; }
    set size(value: number) { this._size = value; }

    /** The maxlength of the element. */
    get maxlength() { return this._maxlength; }
    set maxlength(value: number) { this._maxlength = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);

}

/** Boilerplate for applying mixins.  */
export const _ZcInputBase = mixinZcInput(mixinZcMask(mixinZcValue(mixinZcBase(class { }))));

/** Implementation */
@Component({
  // moduleId: module.id,
  selector: 'zc-input',
  templateUrl: 'input.html',
  inputs: _ZcInputBase.prototype.inputs,
  outputs: _ZcInputBase.prototype.outputs
})
export class ZcInput extends _ZcInputBase { }
