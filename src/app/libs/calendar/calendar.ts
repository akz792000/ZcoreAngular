/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { ZcDirectionType, ZcLanguageType, ZcCalendarType, Constructor, mixinZcBase, mixinZcValue, decorate } from '../base';

/** jQuery */
declare var jQuery: any;

/** Interface. */
export interface _ZcCalendar {
  dateFormat: string;
  direction: ZcDirectionType;
}

/** Mixin to augment a directive. */
export const mixinZcCalendar = function <T extends Constructor<{}>>(base: T): Constructor<_ZcCalendar> & T {

  /** Attributes that use as inputs and output of directive. */
  var
    inputs = ['dateFormat', 'direction'],
    outputs = [];

  /** Decorate class. */
  return decorate(class extends base {

    /** Variables used as cache for getters and setters. */
    private _dateFormat: string = 'yyyy/mm/dd';
    private _direction: ZcDirectionType = ZcDirectionType.LTR;

    /** The dateFormat of the element. */
    get dateFormat() { return this._dateFormat; }
    set dateFormat(value: string) { this._dateFormat = value; }

    /** The direction of the element. */
    get direction() { return this._direction; }
    set direction(value: ZcDirectionType) { this._direction = value; }

    /**
     * Default constructor.
     * 
     * @param args 
     */
    constructor(...args: any[]) { super(...args); }

  }, inputs, outputs);

}

/** Boilerplate for applying mixins.  */
export const _ZcCalendarBase = mixinZcCalendar(mixinZcValue(mixinZcBase(class { })));

/** Calendar implementation. */
@Component({
  // moduleId: module.id,
  selector: 'zc-calendar',
  templateUrl: 'calendar.html',
  inputs: _ZcCalendarBase.prototype.inputs,
  outputs: _ZcCalendarBase.prototype.outputs
})
export class ZcCalendar extends _ZcCalendarBase implements AfterViewInit {

  @ViewChild("input", {static: true}) input: ElementRef;

  /** after view init. */
  ngAfterViewInit() {
    jQuery(this.input.nativeElement).calendarsPicker(
      Object.assign(jQuery.calendars.picker.regional[ZcLanguageType.FA], {
        isRTL: this.direction,
        dateFormat: this.dateFormat,
        calendar: jQuery.calendars.instance(ZcCalendarType.PERSIAN, ZcLanguageType.FA),
        showOnFocus: false,
        showAnim: 'slideDown',
        container: jQuery('body'),
        onSelect: (value) => {
          this.control.setValue(value);
          this.control.markAsDirty();
          this.onChange.emit(this.input.nativeElement);
        }
      })
    );
  }

  /** show the calendar. */
  show() {
    jQuery(this.input.nativeElement).calendarsPicker('show');
  }

}