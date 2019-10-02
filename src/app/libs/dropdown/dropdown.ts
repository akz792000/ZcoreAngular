/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Output, EventEmitter, Component, Injectable, Input, AfterViewInit, ViewChild, ElementRef, HostListener, Renderer } from '@angular/core';
import { Constructor, mixinZcBase, mixinZcValue, decorate } from '../base';

/** jQuery */
declare var jQuery: any;

/** Interface */
export interface _ZcDropdown {
  search: boolean;
}

/** Mixin to augment a directive. */
export function mixinZcDropdown<T extends Constructor<{}>>(base: T): Constructor<_ZcDropdown> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ['search'],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _search: boolean = true;

    /** The search of the element. */
    get search() { return this._search; }
    set search(value: boolean) { this._search = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);
}

/** Boilerplate for applying mixins.  */
export const _ZcDropdownBase = mixinZcDropdown(mixinZcValue(mixinZcBase(class { })));

//** Implementation */
@Component({
  // moduleId: module.id,
  selector: 'zc-dropdown',
  templateUrl: 'dropdown.html',
  inputs: _ZcDropdownBase.prototype.inputs,
  outputs: _ZcDropdownBase.prototype.outputs
})
export class ZcDropdown extends _ZcDropdownBase implements AfterViewInit {

  @ViewChild('dropdown', {static: true}) dropdown: ElementRef;

  ngAfterViewInit(): void {
    jQuery(this.dropdown.nativeElement).dropdown(
      Object.assign({
        onChange: (value: string | number, label: string | number, object: Array<HTMLElement>) => {
          if (object != null && object.length) {
            this.control.setValue(value);
            this.control.markAsDirty();
            this.onChange.emit({
              'value': value,
              'label': label,
              'object': object
            });
          }
        }
      })
    );
  }

}