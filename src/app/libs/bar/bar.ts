/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Injectable, EventEmitter, OnInit } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';

/** jQuery */
declare var jQuery: any;

/** Event emitter. */
const _ZC_EVENT_EMITTER: EventEmitter<any> = new EventEmitter();

/** Implementation */
@Injectable()
export class ZcBarService {

  private _keepAfterNavigationChange = false;

  /**
   * constructor
   * 
   * @param router 
   */
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this._keepAfterNavigationChange) {
          this._keepAfterNavigationChange = false;
        } else {
          _ZC_EVENT_EMITTER.emit();
        }
      }
    });
  }

  /**
   * success
   * 
   * @param message 
   * @param keepAfterNavigationChange 
   */
  success(message: string, keepAfterNavigationChange = false) {
    this._keepAfterNavigationChange = keepAfterNavigationChange;
    _ZC_EVENT_EMITTER.emit({ class: 'positive', icon: 'check circle', content: message });
  }

  /**
   * error
   * 
   * @param message 
   * @param keepAfterNavigationChange 
   */
  error(message: string, keepAfterNavigationChange = false) {
    this._keepAfterNavigationChange = keepAfterNavigationChange;
    _ZC_EVENT_EMITTER.emit({ class: 'negative', icon: 'minus circle', content: message });
  }

}

/** Implementation */
@Component({
  // moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'zc-bar',
  styleUrls: ['bar.css'],
  templateUrl: 'bar.html'
})
export class ZcBar implements OnInit {

  private visible: boolean;
  private icon: string;
  private class: string;
  private content: string;

  /**
   * constructor
   * 
   * @param service 
   */
  constructor(private service: ZcBarService) { }

  /** on init */
  ngOnInit() {
    _ZC_EVENT_EMITTER.subscribe(item => {
      if (item) {
        this.visible = true;
        this.icon = item.icon;
        this.class = item.class;
        this.content = item.content;
      } else
        this.visible = false;
    });
  }

  /**
   * close
   * 
   * @param event 
   */
  close(event: Event) {
    jQuery(<Element>event.target)
      .closest('.message')
      .transition({
        animation: 'fade',
        onComplete: () => this.visible = false
      })
  }

}