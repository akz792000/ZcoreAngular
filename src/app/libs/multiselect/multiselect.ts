/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Output, EventEmitter, Component, Injectable, Input, AfterViewInit, ViewChild, ElementRef, HostListener, Renderer } from "@angular/core";
import { Constructor, mixinZcBase, mixinZcValue, decorate } from "../base";

/** jQuery */
declare var jQuery: any;

/** Interface */
export interface _ZcMultiselect {
  search: boolean;
  useLabels: boolean;
  maxSelections: number;
  allowAdditions: boolean;
}

/** Mixin to augment a directive. */
export function mixinZcMultiselect<T extends Constructor<{}>>(base: T): Constructor<_ZcMultiselect> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ["search", "useLabels", "maxSelections"],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _search: boolean = true;
    private _useLabels: boolean = true;
    private _maxSelections: number = -1;
    private _allowAdditions: boolean = false;

    /** The search of the element. */
    get search() { return this._search; }
    set search(value: boolean) { this._search = value; }

    /** The use labels of the element. */
    get useLabels() { return this._useLabels; }
    set useLabels(value: boolean) { this._useLabels = value; }

    /** The max selections of the element. */
    get maxSelections() { return this._maxSelections; }
    set maxSelections(value: number) { this._maxSelections = value; }

    /** The allow additions of the element. */
    get allowAdditions() { return this._allowAdditions; }
    set allowAdditions(value: boolean) { this._allowAdditions = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);
}

/** Boilerplate for applying mixins.  */
export const _ZcMultiselectBase = mixinZcMultiselect(mixinZcValue(mixinZcBase(class { })));

//** Implementation */
@Component({
  // moduleId: module.id,
  selector: 'zc-multiselect',
  templateUrl: 'multiselect.html',
  inputs: _ZcMultiselectBase.prototype.inputs,
  outputs: _ZcMultiselectBase.prototype.outputs
})
export class ZcMultiselect extends _ZcMultiselectBase implements AfterViewInit {

  @ViewChild("multiselect", {static: true}) multiselect: ElementRef;

  ngAfterViewInit(): void {
    jQuery(this.multiselect.nativeElement).dropdown(
      Object.assign({
        useLabels: this.useLabels,
        maxSelections: this.maxSelections != -1 ? this.maxSelections : null,
        allowAdditions: this.allowAdditions,
        onChange: (value: string | number, label: string | number, object: Array<HTMLElement>) => {
          if (object != null && object.length) {
            this.control.setValue(value);
            this.control.markAsDirty();
            this.onChange.emit({
              "value": value,
              "label": label,
              "object": object
            });
          }
        }
      })
    );
  }

  /** clean */
  clean() {
    jQuery(this.multiselect.nativeElement).dropdown('clear');
  }

}