/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Output, EventEmitter, Component, Injectable, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Constructor, mixinZcBase, mixinZcValue, decorate } from '../base';

/** Interface */
export interface _ZcButton {
  caption: string;
  primary: string;
  secondary: string;
}

/** Mixin to augment a directive. */
export function mixinZcButton<T extends Constructor<{}>>(base: T): Constructor<_ZcButton> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ['caption', 'primary', 'secondary'],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _caption: string;
    private _primary: string;
    private _secondary: string;

    /** The caption of the element. */
    get caption() { return this._caption; }
    set caption(value: string) { this._caption = value; }

    /** The primary of the element. */
    get primary() { return this._primary; }
    set primary(value: string) { this._primary = value; }

    /** The secondary of the element. */
    get secondary() { return this._secondary; }
    set secondary(value: string) { this._secondary = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);
}

/** Boilerplate for applying mixins.  */
export const _ZcButtonBase = mixinZcButton(mixinZcBase(class { }));

/** Implementation */
@Component({
  // moduleId: module.id,
  selector: 'zc-button',
  templateUrl: 'button.html',
  inputs: _ZcButtonBase.prototype.inputs,
  outputs: _ZcButtonBase.prototype.outputs
})
export class ZcButton extends _ZcButtonBase { }