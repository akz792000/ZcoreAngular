/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import {
  Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit,
  ViewContainerRef, OnDestroy, Output, EventEmitter, HostListener
} from "@angular/core";
import { FormControl } from '@angular/forms';
import { mixinZcButton } from '../button';
import { Constructor, mixinZcBase, mixinZcValue, decorate } from "../base";

/** jQuery */
declare var jQuery: any;

/** Interface */
export interface _ZcToggle {
  captionOn: string;
  primaryOn: string;
  secondaryOn: string;
}

/** Mixin to augment a directive. */
export const mixinZcToggle = function <T extends Constructor<{}>>(base: T): Constructor<_ZcToggle> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ["captionOn", "primaryOn", "secondaryOn"],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _primaryOn: string;
    private _secondaryOn: string;
    private _captionOn: string;

    /** The captionOn of the element. */
    get captionOn() { return this._captionOn; }
    set captionOn(value: string) { this._captionOn = value; }

    /** The primaryOn of the element. */
    get primaryOn() { return this._primaryOn; }
    set primaryOn(value: string) { this._primaryOn = value; }

    /** The secondaryOn of the element. */
    get secondaryOn() { return this._secondaryOn; }
    set secondaryOn(value: string) { this._secondaryOn = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);

}

/** Boilerplate for applying mixins.  */
export const _ZcToggleBase = mixinZcToggle(mixinZcButton(mixinZcValue(mixinZcBase(class { }))));

/** Implementation. */
@Component({
  // moduleId: module.id,
  selector: 'zc-toggle',
  templateUrl: 'toggle.html',
  inputs: _ZcToggleBase.prototype.inputs,
  outputs: _ZcToggleBase.prototype.outputs
})
export class ZcToggle extends _ZcToggleBase implements AfterViewInit, OnDestroy {

  @ViewChild("button", {static: true}) button: ElementRef;

  /** after view initialize. */
  ngAfterViewInit() {
    jQuery(this.button.nativeElement).state({
      onChange: () => {
        this.control.setValue(this.button.nativeElement.classList.contains('active'));
      }
    });
  }

  /** on destroy call. */
  ngOnDestroy() {
    jQuery(this.button.nativeElement).state("destroy");
  }

}