/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NativeDateService, NativeDateServiceOptions } from '@ui-kitten/components';
export interface DateFnsOptions extends NativeDateServiceOptions {
    parseOptions?: {};
    formatOptions?: {};
}
export declare class DateFnsService extends NativeDateService {
    constructor(locale?: string, options?: DateFnsOptions);
    format(date: Date, format: string): string;
    parse(date: string, format: string): Date;
    getId(): string;
}
