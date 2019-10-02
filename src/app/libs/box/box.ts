/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import {
  Component, Injectable, ChangeDetectionStrategy, OnInit,
  AfterViewInit, EventEmitter, ViewEncapsulation, ElementRef, ViewChild
} from "@angular/core";

import { ZcBoxButtonsType, ZcBoxIconType } from '../base';

/** jQuery */
declare var jQuery: any;

/** Event emitter. */
const _ZC_EVENT_EMITTER: EventEmitter<any> = new EventEmitter();

/** Implementation */
@Injectable()
export class ZcBoxService {

  /**
   * show
   * 
   * @param header 
   * @param content 
   * @param icon 
   * @param type 
   * @param func 
   */
  show(header: string = "", content: string = "", icon: ZcBoxIconType = ZcBoxIconType.MB_ICONNONE,
    type: ZcBoxButtonsType = ZcBoxButtonsType.MB_OK, func: any = null) {
    _ZC_EVENT_EMITTER.emit({
      header: header,
      content: content,
      icon: icon,
      buttons: ZcBoxButtonsType.value(type)
    });
  }

  /** hide */
  hide() {
    _ZC_EVENT_EMITTER.emit(false);
  }

}

/** Implementation */
@Component({
  // moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'zc-box',
  templateUrl: 'box.html'
})
export class ZcBox implements AfterViewInit, OnInit {

  private _object: any;
  private header: string;
  private content: string;
  private icon: string;
  private buttons: any;
  @ViewChild("modal", {static: true}) private modal: ElementRef;

  /** on init */
  ngOnInit() {
    _ZC_EVENT_EMITTER.subscribe(item => {
      if (item) {
        this.header = item.header;
        this.content = item.content;
        this.icon = item.icon;
        this.buttons = item.buttons;
        this._object
          .modal({
            closable: false,
            blurring: false,
            inverted: true
          })
          .modal('show')
      } else {
        this._object.modal('hide');
      }
    });
  }

  /** after view initialization. */
  ngAfterViewInit() {
    this._object = jQuery(this.modal.nativeElement);
  }

}