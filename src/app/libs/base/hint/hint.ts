/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Directive, Input, HostListener, Renderer, OnDestroy } from "@angular/core";
import { ZcStringUtils } from '../utils';

/** jQuery */
declare var jQuery: any;

/** Implementation */
@Directive({
  selector: "[zcHint]",
  exportAs: "zcHint"
})
export class ZcHint implements OnDestroy {

  @Input("zcHint") message: string;
  private _jquery: any;

  /**
   * show
   * 
   * @param content 
   */
  private show(content: string) {
    this._jquery
      .popup({
        closable: true,
        position: "top left",
        preserve: false,
        lastResort: true,
        on: "manual",
        content: content
      })
      .popup("show");
  }

  /**
   * focus
   * 
   * @param event 
   */
  @HostListener('focus', ['$event'])
  private onFocus(event: Event) {
    this._jquery = jQuery(<Element>event.target);
    if (!ZcStringUtils.isEmpty(this.message)) this.show(this.message);
  }

  /** blur */
  @HostListener('blur')
  private onBlur() {
    if (this._jquery.popup("exists")) this._jquery.popup("hide");
  }

  /** keyup */
  @HostListener('keyup')
  private onKeyup() {
    if (this._jquery.popup("exists")) {
      ZcStringUtils.isEmpty(this.message) ? this._jquery.popup("hide") : this._jquery.popup("change content", this.message);
    } else {
      if (!ZcStringUtils.isEmpty(this.message)) this.show(this.message);
    }
  }

  /** on destroy */
  ngOnDestroy(): void {
    if (this._jquery) this._jquery.popup("destroy");
  }

}