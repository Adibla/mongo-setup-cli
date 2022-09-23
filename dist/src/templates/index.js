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
exports.generateSchemaFromResults = void 0;
const fs = __importStar(require("fs"));
const Handlebars = __importStar(require("handlebars"));
const handlebarsHelpers = __importStar(require("handlebars-helpers"));
const string_utils_1 = require("../utils/string-utils");
const handlebars_utils_1 = require("../utils/handlebars-utils");
(0, handlebars_utils_1.registerCustomHelpers)();
handlebarsHelpers.default();
const generateSchemaFromResults = async (results) => {
    return fs.promises.readFile(__dirname + "/base/schema.hbs")
        .then(source => {
        const template = Handlebars.compile(source.toString());
        const context = {
            results: results
        };
        const content = template(context);
        return fs.promises.writeFile("./src/models/" + results.schemaName + ".js", content);
    })
        .then(fileWrit => {
        return fs.promises.readFile("./src/models/index.js");
    })
        .then(fileContent => {
        const compiledIndex = Handlebars.compile(fileContent.toString().replace(/\/\//g, ''));
        const contentModelToWrite = compiledIndex({ requiredSchema: "const " + (0, string_utils_1.capitalizeFirst)(results.schemaName) + " = require('./" + results.schemaName + "')\r\n//{{{requiredSchema}}}", nameSchema: (0, string_utils_1.capitalizeFirst)(results.schemaName) + ",\r\n//{{nameSchema}}" });
        return fs.promises.writeFile("./src/models/index.js", contentModelToWrite).then(d => results);
    });
};
exports.generateSchemaFromResults = generateSchemaFromResults;
//# sourceMappingURL=index.js.map