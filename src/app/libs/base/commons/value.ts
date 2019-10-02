/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Injectable, Input, ElementRef, ViewChild, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Constructor, decorate } from "./common";

/** Value interface. */
export interface _ZcValue {
    control: FormControl;
    icon: string;
    label: string;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    validate(): boolean;    
}

/** Mixin to augment a directive. */
export const mixinZcValue = function <T extends Constructor<{}>>(base: T): Constructor<_ZcValue> & T {

    /** Attributes that use as inputs and output of directive. */
    var
        inputs = ["control", "icon", "label", "placeholder", "readonly", "required"],
        outputs = [];

    /**
     * Default constructor.
     * 
     * @param args 
     */
    return decorate(class extends base {

        /** Variables used as cache for getters and setters. */
        private _control: FormControl;
        private _icon: string;
        private _label: string;
        private _placeholder: string;
        private _readonly: boolean = false;
        private _required: boolean;

        /** The control of the element. */
        get control() { return this._control; }
        set control(value: FormControl) { this._control = value; }

        /** The icon of the element. */
        get icon() { return this._icon; }
        set icon(value: string) { this._icon = value; }

        /** The label of the element. */
        get label() { return this._label; }
        set label(value: string) { this._label = value; }

        /** The placeholder of the element. */
        get placeholder() { return this._placeholder; }
        set placeholder(value: string) { this._placeholder = value; }

        /** Whether the component is readonly. */
        get readonly() { return this._readonly; }
        set readonly(value: boolean) { this._readonly = value; }

        /** Whether the component is required. */
        get required() { return this._required; }
        set required(value: boolean) { this._required = value; }   

        /** Validate value. */
        validate(): boolean {
            return this.control.valid || this.control.pristine;
        }

        /** Default constructor. */
        constructor(...args: any[]) { super(...args); }

    }, inputs, outputs);

}