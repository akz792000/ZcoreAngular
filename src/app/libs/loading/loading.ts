/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Component, Injectable, Input, OnInit, EventEmitter, ViewEncapsulation } from "@angular/core";

/** Event emitter. */
const _ZC_EVENT_EMITTER: EventEmitter<boolean> = new EventEmitter()

/** Implementation */
@Injectable()
export class ZcLoadingService {

  /** show */
  show() {
    _ZC_EVENT_EMITTER.emit(true);
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
  selector: "zc-loading",
  templateUrl: 'loading.html'
})
export class ZcLoading implements OnInit {

  @Input() class: string = "inverted";
  @Input() value: string;
  visible: boolean;

  /**
   * constructor
   * 
   * @param service 
   */
  constructor(private service: ZcLoadingService) { }

  /** on init */
  ngOnInit() {
    _ZC_EVENT_EMITTER.subscribe(item => this.visible = item);
  }

}
