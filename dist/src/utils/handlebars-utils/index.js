"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomHelpers = void 0;
const Handlebars = __importStar(require("handlebars"));
const string_utils_1 = require("../string-utils");
const parseDefaultBasedOnTypes = (def, type) => {
    /* ["String", "List", "Boolean", "Number", "ObjectId", "Date", "Buffer", "Decimal", "Mixed"]
     * TODO: check and map missing types
     */
    const mapTypes = {
        "String": (val) => `'${val}'`,
        "default": (val) => val
    };
    const matched = mapTypes[type] || mapTypes['default'];
    return matched(def);
};
const registerCustomHelpers = () => {
    const getSchemaAttribute = (type) => {
        const mapAttributes = {
            List: "[]",
            ObjectId: "Schema.Types.ObjectId",
            Decimal: "Schema.Types.Decimal128",
            Mixed: "Schema.Types.Mixed",
            default: type
        };
        return mapAttributes[type] || mapAttributes['default'];
    };
    Handlebars.registerHelper("capitalizeFirst", (value, options) => (0, string_utils_1.capitalizeFirst)(value));
    Handlebars.registerHelper("attributeFormat", (value, options) => {
        let attributeStringToReturn = `{type:${getSchemaAttribute(value.attributeType)} `;
        attributeStringToReturn = value.attributeIndex === 'Yes' ? `${attributeStringToReturn}, index: true ` : `${attributeStringToReturn}`;
        attributeStringToReturn = value.choiceMinValue === 'Yes' ? `${attributeStringToReturn}, min: ${value.minValue} ` : `${attributeStringToReturn}`;
        attributeStringToReturn = value.choiceMinValue === 'Yes' ? `${attributeStringToReturn}, max: ${value.maxValue} ` : `${attributeStringToReturn}`;
        attributeStringToReturn = value.choiceDefault === 'Yes' ? `${attributeStringToReturn}, default: ${parseDefaultBasedOnTypes(value.defaultValue, value.attributeType)} ` : `${attributeStringToReturn}`;
        attributeStringToReturn = value.choiceRequired === 'Yes' ? `${attributeStringToReturn}, required: true ` : `${attributeStringToReturn}`;
        attributeStringToReturn = value.choiceDefaultDate === 'Yes' ? `${attributeStringToReturn}, default: ${Date.now()} ` : `${attributeStringToReturn}`;
        return `${attributeStringToReturn}}`;
    });
};
exports.registerCustomHelpers = registerCustomHelpers;
//# sourceMappingURL=index.js.map