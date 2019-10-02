/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */


import { _EN } from './_en';
import { _FA } from './_fa';
import { ZC_TRANSLATION_TOKEN, ZcTranslateDictionay } from '../libs';

export function getTranslationDictionaryFactory() {
  return ZcTranslateDictionay.getInstance({ 'en': _EN, 'fa': _FA }, true);
}

export const TRANSLATION_PROVIDER = {
    provide: ZC_TRANSLATION_TOKEN,
    useFactory: getTranslationDictionaryFactory
}