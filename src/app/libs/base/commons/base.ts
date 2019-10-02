/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Injectable, Input, EventEmitter } from "@angular/core";
import { Constructor, decorate } from "./common";

/** Interface */
export interface _ZcBase {
    disabled: boolean;
    class: string;
    tabindex: number;
    title: string;
    visible: boolean;
    click(event: Event): void;
    onBlur: EventEmitter<any>;
    onChange: EventEmitter<any>;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onKeydown: EventEmitter<any>;
    onKeypress: EventEmitter<any>;
    onPaste: EventEmitter<any>;
}

/** Mixin to augment a directive. */
export function mixinZcBase<T extends Constructor<{}>>(base: T): Constructor<_ZcBase> & T {

    /** Attributes that use as inputs and output of directive. */
    var
        inputs = ["disabled", "class", "tabindex", "title", "visible"],
        outputs = ["onBlur", "onChange", "onClick", "onFocus", "onKeydown", "onKeypress", "onPaste"];

    /** Decorate class. */
    return decorate(class extends base {

        /** Variables used as cache for getters and setters. */
        private _disabled: boolean = false;
        private _class: string;
        private _tabindex: number;
        private _title: string;
        private _visible: boolean = true;

        /** The onBlur event emmiter. */
        onBlur: EventEmitter<any> = new EventEmitter<any>();

        /** The onChange event emmiter. */
        onChange: EventEmitter<any> = new EventEmitter<any>();

        /** The onClick event emmiter. */
        onClick: EventEmitter<any> = new EventEmitter<any>();

        /** The onFocus event emmiter. */
        onFocus: EventEmitter<any> = new EventEmitter<any>();

        /** The onKeydown event emmiter. */
        onKeydown: EventEmitter<any> = new EventEmitter<any>();

        /** The onKeypress event emmiter. */
        onKeypress: EventEmitter<any> = new EventEmitter<any>();

        /** The onPaste event emmiter. */
        onPaste: EventEmitter<any> = new EventEmitter<any>();        

        /** Whether the element is disabled. */
        get disabled() { return this._disabled; }
        set disabled(value: boolean) { this._disabled = value; }

        /** The class of the element. */
        get class() { return this._class; }
        set class(value: string) { this._class = value; }

        /** The tabindex of the element. */
        get tabindex() { return this._tabindex; }
        set tabindex(value: number) { this._tabindex = value; }

        /** The title of the element. */
        get title() { return this._title; }
        set title(value: string) { this._title = value; }

        /** Whether the element is visible. */
        get visible() { return this._visible; }
        set visible(value: boolean) { this._visible = value; }

        /** Blur method. */
        blur(event: Event): void {
            if (!this.disabled) this.onBlur.emit(event);
        }

        /** Change trigger method. */
        change(event: Event): void {
            this.onChange.emit(event);
        }

        /** Click trigger method. */
        click(event: Event): void {
            if (!this.disabled) this.onClick.emit(event);
        }

        /** Focus trigger method. */
        focus(event: Event): void {
            if (!this.disabled) this.onFocus.emit(event);
        }

        /** Keydown trigger method. */
        keydown(event: Event): void {
            if (!this.disabled) this.onKeydown.emit(event);
        }

        /** Keypress trigger method. */
        keypress(event: Event): void {
            if (!this.disabled) this.onKeypress.emit(event);
        }

        /** Paste trigger method. */
        paste(event: Event): void {
            if (!this.disabled) this.onPaste.emit(event);
        }        

        /**
         * Default constructor.
         * 
         * @param args 
         */
        constructor(...args: any[]) { super(...args); }

    }, inputs, outputs);

}