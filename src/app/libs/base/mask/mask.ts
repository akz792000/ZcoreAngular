/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Directive, Input, Output, HostListener, Renderer, OnInit, ElementRef, EventEmitter } from "@angular/core";
import { ControlValueAccessor } from '@angular/forms';
import { Constructor, mixinZcBase, mixinZcValue, decorate } from "../commons";
import { ZcStringUtils } from '../utils';

/** jQuery */
declare var jQuery: any;

/** Interface */
export interface _ZcMask {
  mask: string;
}

/** Mixin to augment a directive. */
export const mixinZcMask = function <T extends Constructor<{}>>(base: T): Constructor<_ZcMask> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ["mask"],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _max: string;

    /** The max of the element. */
    get max() { return this._max; }
    set max(value: string) { this._max = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);

}

/** Implementation */
@Directive({
  selector: "[zcMask]",
  exportAs: "zcMask"
})
export class ZcMask implements OnInit, ControlValueAccessor {

  slotChar: string = '_';

  autoClear: boolean = true;

  disabled: boolean;

  readonly: boolean;

  unmask: boolean;

  value: any;

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  filled: boolean;

  defs: any;

  tests: any[];

  partialPosition: any;

  firstNonMaskPos: number;

  lastRequiredNonMaskPos: any;

  len: number;

  oldVal: string;

  buffer: any;

  defaultBuffer: string;

  focusText: string;

  caretTimeoutId: any;

  focus: boolean;

  private _mask: string;

  isMaskable(): boolean {
    return this.mask && this.mask.length != 0;
  }

  @Input("zcMask")
  get mask(): string { return this._mask; }
  set mask(val: string) { this._mask = val; }

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
    if (this.isMaskable()) this.initMask();
  }

  initMask() {
    this.tests = [];
    this.partialPosition = this.mask.length;
    this.len = this.mask.length;
    this.firstNonMaskPos = null;
    this.defs = {
      '9': '[0-9]',
      'a': '[A-Za-z]',
      '*': '[A-Za-z0-9]'
    };

    let maskTokens = this.mask.split('');
    for (let i = 0; i < maskTokens.length; i++) {
      let c = maskTokens[i];
      if (c == '?') {
        this.len--;
        this.partialPosition = i;
      }
      else if (this.defs[c]) {
        this.tests.push(new RegExp(this.defs[c]));
        if (this.firstNonMaskPos === null) {
          this.firstNonMaskPos = this.tests.length - 1;
        }
        if (i < this.partialPosition) {
          this.lastRequiredNonMaskPos = this.tests.length - 1;
        }
      }
      else {
        this.tests.push(null);
      }
    }

    this.buffer = [];
    for (let i = 0; i < maskTokens.length; i++) {
      let c = maskTokens[i];
      if (c != '?') {
        if (this.defs[c])
          this.buffer.push(this.getPlaceholder(i));
        else
          this.buffer.push(c);
      }
    }
    this.defaultBuffer = this.buffer.join('');
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.value = (this.value == undefined || this.value == null) ? '' : this.value;
      this.checkVal();
      this.focusText = this.elementRef.nativeElement.value;
      this.updateFilledState();
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  caret(first?: number, last?: number) {
    let range, begin, end;

    if (!this.elementRef.nativeElement.offsetParent || this.elementRef.nativeElement !== document.activeElement) {
      return;
    }

    if (typeof first == 'number') {
      begin = first;
      end = (typeof last === 'number') ? last : begin;
      if (this.elementRef.nativeElement.setSelectionRange) {
        this.elementRef.nativeElement.setSelectionRange(begin, end);
      }
      else if (this.elementRef.nativeElement['createTextRange']) {
        range = this.elementRef.nativeElement['createTextRange']();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', begin);
        range.select();
      }
    }
    else {
      if (this.elementRef.nativeElement.setSelectionRange) {
        begin = this.elementRef.nativeElement.selectionStart;
        end = this.elementRef.nativeElement.selectionEnd;
      }
      else if (document['selection'] && document['selection'].createRange) {
        range = document['selection'].createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }

      return { begin: begin, end: end };
    }
  }

  getPlaceholder(i: number) {
    if (i < this.slotChar.length) {
      return this.slotChar.charAt(i);
    }
    return this.slotChar.charAt(0);
  }

  seekNext(pos) {
    while (++pos < this.len && !this.tests[pos]);
    return pos;
  }

  seekPrev(pos) {
    while (--pos >= 0 && !this.tests[pos]);
    return pos;
  }

  shiftL(begin: number, end: number) {
    let i, j;

    if (begin < 0) {
      return;
    }

    for (i = begin, j = this.seekNext(end); i < this.len; i++) {
      if (this.tests[i]) {
        if (j < this.len && this.tests[i].test(this.buffer[j])) {
          this.buffer[i] = this.buffer[j];
          this.buffer[j] = this.getPlaceholder(j);
        } else {
          break;
        }

        j = this.seekNext(j);
      }
    }
    this.writeBuffer();
    this.caret(Math.max(this.firstNonMaskPos, begin));
  }

  shiftR(pos) {
    let i, c, j, t;

    for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
      if (this.tests[i]) {
        j = this.seekNext(i);
        t = this.buffer[i];
        this.buffer[i] = c;
        if (j < this.len && this.tests[j].test(t)) {
          c = t;
        } else {
          break;
        }
      }
    }
  }

  clearBuffer(start, end) {
    let i;
    for (i = start; i < end && i < this.len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.getPlaceholder(i);
      }
    }
  }

  writeBuffer() {
    this.elementRef.nativeElement.value = this.buffer.join('');
  }

  checkVal(allow?: boolean) {
    //try to place characters where they belong
    let test = this.elementRef.nativeElement.value,
      lastMatch = -1,
      i,
      c,
      pos;

    for (i = 0, pos = 0; i < this.len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.getPlaceholder(i);
        while (pos++ < test.length) {
          c = test.charAt(pos - 1);
          if (this.tests[i].test(c)) {
            this.buffer[i] = c;
            lastMatch = i;
            break;
          }
        }
        if (pos > test.length) {
          this.clearBuffer(i + 1, this.len);
          break;
        }
      } else {
        if (this.buffer[i] === test.charAt(pos)) {
          pos++;
        }
        if (i < this.partialPosition) {
          lastMatch = i;
        }
      }
    }
    if (allow) {
      this.writeBuffer();
    } else if (lastMatch + 1 < this.partialPosition) {
      if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
        // Invalid value. Remove it and replace it with the
        // mask, which is the default behavior.
        if (this.elementRef.nativeElement.value) this.elementRef.nativeElement.value = '';
        this.clearBuffer(0, this.len);
      } else {
        // Invalid value, but we opt to show the value to the
        // user and allow them to correct their mistake.
        this.writeBuffer();
      }
    } else {
      this.writeBuffer();
      this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.substring(0, lastMatch + 1);
    }
    return (this.partialPosition ? i : this.firstNonMaskPos);
  }

  getUnmaskedValue() {
    let unmaskedBuffer = [];
    for (let i = 0; i < this.buffer.length; i++) {
      let c = this.buffer[i];
      if (this.tests[i] && c != this.getPlaceholder(i)) {
        unmaskedBuffer.push(c);
      }
    }

    return unmaskedBuffer.join('');
  }

  updateModel(e) {
    this.onModelChange(this.unmask ? this.getUnmaskedValue() : e.target.value);
  }

  updateFilledState() {
    this.filled = this.elementRef.nativeElement && this.elementRef.nativeElement.value != '';
  }

  @HostListener('focus', ['$event'])
  private focusMethod(event: Event) {
    if (!this.isMaskable()) return;

    if (this.readonly) {
      return;
    }

    this.focus = true;

    clearTimeout(this.caretTimeoutId);
    let pos;

    this.focusText = this.elementRef.nativeElement.value;

    pos = this.checkVal();

    this.caretTimeoutId = setTimeout(() => {
      if (this.elementRef.nativeElement !== document.activeElement) {
        return;
      }
      this.writeBuffer();
      if (pos == this.mask.replace("?", "").length) {
        this.caret(0, pos);
      } else {
        this.caret(pos);
      }
    }, 10);

  }

  @HostListener('blur', ['$event'])
  private onBlur(event: Event) {
    if (!this.isMaskable()) return;
    this.focus = false;
    this.onModelTouched();
    this.checkVal();
    this.updateModel(event);
    this.updateFilledState();
    if (this.elementRef.nativeElement.value != this.focusText) {
      let event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      this.elementRef.nativeElement.dispatchEvent(event);
    }
  }

  @HostListener('keydown', ['$event'])
  private onKeydown(event) {
    if (!this.isMaskable()) return;
    if (this.readonly) {
      return;
    }

    let k = event.which || event.keyCode,
      pos,
      begin,
      end;

    this.oldVal = this.elementRef.nativeElement.value;

    //backspace, delete, and escape get special treatment
    if (k === 8 || k === 46) {
      pos = this.caret();
      begin = pos.begin;
      end = pos.end;


      if (end - begin === 0) {
        begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
        end = k === 46 ? this.seekNext(end) : end;
      }

      this.clearBuffer(begin, end);
      this.shiftL(begin, end - 1);
      this.updateModel(event);

      event.preventDefault();
    } else if (k === 13) { // enter
      this.onBlur(event);
      this.updateModel(event);
    } else if (k === 27) { // escape
      this.elementRef.nativeElement.value = this.focusText;
      this.caret(0, this.checkVal());
      this.updateModel(event);
      event.preventDefault();
    }
  }

  @HostListener('keypress', ['$event'])
  private onKeypress(event) {
    if (!this.isMaskable()) return;
    if (this.readonly) {
      return;
    }

    var k = event.which || event.keyCode,
      pos = this.caret(),
      p,
      c,
      next;

    if (event.ctrlKey || event.altKey || event.metaKey || k < 32) {//Ignore
      return;
    } else if (k && k !== 13) {
      if (pos.end - pos.begin !== 0) {
        this.clearBuffer(pos.begin, pos.end);
        this.shiftL(pos.begin, pos.end - 1);
      }

      p = this.seekNext(pos.begin - 1);
      if (p < this.len) {
        c = String.fromCharCode(k);
        if (this.tests[p].test(c)) {
          this.shiftR(p);

          this.buffer[p] = c;
          this.writeBuffer();
          next = this.seekNext(p);

          this.caret(next);
        }
      }
      event.preventDefault();
    }

    this.updateModel(event);

    this.updateFilledState();
  }

  @HostListener('input', ['$event'])
  @HostListener('paste', ['$event'])
  private onInput(event: Event) {
    console.log("asd")
    if (!this.isMaskable()) return;
    if (this.readonly) {
      return;
    }

    setTimeout(() => {
      var pos = this.checkVal(true);
      this.caret(pos);
      this.updateModel(event);
    }, 0);
  }

}