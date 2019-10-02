/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Output, EventEmitter, Component, Injectable, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Constructor, mixinZcBase, mixinZcValue, decorate } from '../base';

/** Image interface. */
export interface _ZcImage {
  src: string;
  height: number;
  width: number;
}

/** Mixin to augment a directive. */
export const mixinZcImage = function <T extends Constructor<{}>>(base: T): Constructor<_ZcImage> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ['src', 'height', 'width'],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _src: string;
    private _height: number;
    private _width: number;

    /** The src of the element. */
    get src() { return this._src; }
    set src(value: string) { this._src = value; }

    /** The height of the element. */
    get height() { return this._height; }
    set height(value: number) { this._height = value; }

    /** The width of the element. */
    get width() { return this._width; }
    set width(value: number) { this._width = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);

}

/** Boilerplate for applying mixins.  */
export const _ZcImageBase = mixinZcImage(mixinZcBase(class { }));

/** Implementation */
@Component({
  // moduleId: module.id,
  selector: 'zc-image',
  templateUrl: 'image.html',
  inputs: _ZcImageBase.prototype.inputs,
  outputs: _ZcImageBase.prototype.outputs
})
export class ZcImage extends _ZcImageBase { }