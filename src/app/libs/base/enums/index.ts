/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

/** Calendar type. */
export enum ZcCalendarType { GREGORIAN = "GREGORIAN", PERSIAN = "PERSIAN" };

/** Direction type. */
export enum ZcDirectionType { LTR = 0, RTL = 1 };

/** Language type. */
export enum ZcLanguageType { EN = "en", FA = "fa" };

/** Box buttons. */
export enum ZcBoxButtonsType {
  MB_OK, MB_OKCANCEL, MB_YESNO, MB_YESNOCANCEL
};

/** Box buttons namespace. */
export namespace ZcBoxButtonsType {

  /**
   * value
   * 
   * @param type 
   */
  export function value(type: ZcBoxButtonsType) {
    switch (type) {
      case ZcBoxButtonsType.MB_OK:
        return [
          { "title": "GLB.ok", "class": "positive" }
        ];
      case ZcBoxButtonsType.MB_OKCANCEL:
        return [
          { "title": "GLB.ok", "class": "positive" },
          { "title": "GLB.cancel", "class": "black" }
        ];
      case ZcBoxButtonsType.MB_YESNO:
        return [
          { "title": "GLB.yes", "class": "positive" },
          { "title": "GLB.no", "class": "black" }
        ];
      default:
        return [
          { "title": "GLB.ok", "class": "positive" }
        ]
    }

  }
}

/** Box icon. */
export enum ZcBoxIconType {
  MB_ICONINFO = "info circle", MB_ICONWARNING = "warning circle", MB_ICONHELP = "help circle",
  MB_ICONERROR = "minus circle", MB_ICONSUCCESS = "check circle", MB_ICONNONE = ""
};