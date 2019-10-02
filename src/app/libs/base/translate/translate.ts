/**
 * @license
 * Copyright Ali Karimizandi. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://.../license
 */

import { Pipe, PipeTransform, Injectable, InjectionToken, Inject } from '@angular/core';

/** Implementation */
@Injectable()
export class ZcTranslateDictionay {

    private static _instance: ZcTranslateDictionay = null;

    /**
     * get instance of class
     * 
     * @param value 
     * @param force 
     */
    static getInstance(value, force: boolean = false): ZcTranslateDictionay {
        if (this._instance == null) {
            this._instance = new ZcTranslateDictionay(value);
        } else {
            if (force) {
                this._instance._value = value;
            }
        }
        return this._instance;
    }

    /**
     * constructor
     * 
     * @param value 
     */
    private constructor(private _value) { }

    /** get value. */
    getValue() {
        return this._value;
    };

}

/** Provider token. */
export const ZC_TRANSLATION_TOKEN = new InjectionToken<ZcTranslateDictionay>('ZC_TRANSLATION_TOKEN');

/** Factory method. */
export function getZcTranslateDictionay() {
    return ZcTranslateDictionay.getInstance({});
}

/** Translation provider. */
export let ZC_TRANSLATION_PROVIDER = {
    provide: ZC_TRANSLATION_TOKEN,
    useFactory: getZcTranslateDictionay
}

/** Implementation */
@Injectable()
export class ZcTranslateService {

    /** Variables used as cache for getters and setters. */
    private _currentLang: string = 'fa';

    /** The current Language. */
    get currentLang() { return this._currentLang; }
    set currentLang(value: string) { this._currentLang = value; }

    /**
     * constructor
     * 
     * @param _dictionary 
     */
    constructor( @Inject(ZC_TRANSLATION_TOKEN) private _dictionary: ZcTranslateDictionay) { }

    /**
     * get value
     * 
     * @param key 
     */
    private value(key: string): string {
        let val = this._dictionary.getValue();
        return (val[this.currentLang] && val[this.currentLang][key]) ? val[this.currentLang][key] : key;
    }

    /**
     * replace arguments
     * 
     * @param word 
     * @param args 
     */
    public replace(word: string = '', args: any | any[] = '') {
        let translation: string = word, obj = args;
        if (Object.keys(obj).length === 0 && obj.constructor === Object) return translation;
        var i = 0;
        for (let key in obj) {
            translation = translation.replace('{' + i + '}', obj[key]);
            i++;
        }
        return translation;
    }

    /**
     * translate
     * 
     * @param key 
     * @param args 
     */
    public translate(key: any, args?: any | any[]) {        
        // init param
        var param = (typeof key === 'object')
            ? { key: key.key, args: key.value }
            : { key: key, args: args }

        // value
        const value: string = this.value(param.key);

        // set arguments
        if (!param.args || param.args.length === 0) return value;
        return this.replace(value, param.args);
    }

}

/** Implementation */
@Pipe({
    name: 'zcTranslate',
    pure: false
})
export class ZcTranslate implements PipeTransform {

	/**
	 * constructor
	 * 
	 * @param service 
	 */
    constructor(private service: ZcTranslateService) { }

	/**
	 * transform
	 * 
	 * @param value 
	 * @param args 
	 */
    transform(value: any, ...args: any[]): any {
        if (!value) return;
        return this.service.translate(value, args);
    }

}