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
exports.loadAllData = exports.clearAllCollection = exports.insertAllCollection = exports.insertData = void 0;
const fs = __importStar(require("fs"));
const _mapDirContentKey = async (dirContent, dirPath) => {
    const mappedJsonFile = dirContent.map(file => {
        return fs.promises.readFile(dirPath + '/' + file)
            .then(content => {
            const splitKey = file.split('.json')[0];
            return { [splitKey]: JSON.parse(content.toString()) };
        });
    });
    return Promise.all(mappedJsonFile);
};
const _reduceResultsFile = (results) => {
    return results.reduce((a, b) => {
        return { ...a, ...b };
    });
};
const loadAllData = async (dir) => {
    return fs.promises.readdir(dir)
        .then((content) => _mapDirContentKey(content, dir))
        .then(_reduceResultsFile);
};
exports.loadAllData = loadAllData;
const insertData = async (model, data) => {
    return model.insertMany(data, { ordered: false }).catch((err) => true);
};
exports.insertData = insertData;
const insertAllCollection = async (models, data) => {
    const insertPromises = Object.keys(models).map(key => {
        if (data[key.toLowerCase()]) {
            return insertData(models[key], data[key.toLowerCase()]);
        }
        return Promise.resolve(true);
    });
    return Promise.all(insertPromises);
};
exports.insertAllCollection = insertAllCollection;
const clearAllCollection = async (models) => {
    const deletePromises = Object.keys(models).map(key => {
        return models[key].deleteMany();
    });
    return Promise.all(deletePromises);
};
exports.clearAllCollection = clearAllCollection;
//# sourceMappingURL=index.js.map