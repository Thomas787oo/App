"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@ui-kitten/components");
const parse_1 = __importDefault(require("date-fns/parse"));
const format_1 = __importDefault(require("date-fns/format"));
const DEFAULT_OPTIONS = {
    format: 'dd/MM/yyyy',
    parseOptions: {
        useAdditionalDayOfYearTokens: true,
        useAdditionalWeekYearTokens: true,
    },
    formatOptions: {
        useAdditionalDayOfYearTokens: true,
        useAdditionalWeekYearTokens: true,
    },
};
class DateFnsService extends components_1.NativeDateService {
    constructor(locale = 'en', options) {
        super(locale, { ...DEFAULT_OPTIONS, ...options });
    }
    format(date, format) {
        if (date) {
            return format_1.default(date, format || this.options.format, this.options.formatOptions);
        }
        return '';
    }
    parse(date, format) {
        return parse_1.default(date, format || this.options.format, new Date(), this.options.parseOptions);
    }
    getId() {
        return 'date-fns';
    }
}
exports.DateFnsService = DateFnsService;
//# sourceMappingURL=dateFnsDate.service.js.map