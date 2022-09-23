#! /usr/local/bin/node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = __importStar(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const figlet = __importStar(require("figlet"));
const fs = __importStar(require("fs"));
const start = __importStar(require("../src"));
const templates_1 = require("../src/templates");
const start_1 = require("./questions-data/start");
const seeds_qst_1 = require("./questions-data/seeds-qst");
const schema_1 = require("./questions-data/schema");
const attributes_1 = require("./questions-data/attributes");
const json_definition_1 = require("./questions-data/json-definition");
const init = () => {
    console.log(chalk_1.default.green(figlet.textSync("Mongo setup CLI", {
        horizontalLayout: "default",
        verticalLayout: "default"
    })));
};
const askQuestions = () => {
    return inquirer.prompt(start_1.startQuestionsData);
};
const askQuestionsSeeds = async (previousResults, askForSeedName) => {
    const qst = (0, seeds_qst_1.seedsQuestionsData)(askForSeedName);
    return inquirer.prompt(qst)
        .then(result => {
        let filename = previousResults.schemaName || result.schemaName;
        return result.seedToSave ? fs.promises.writeFile("./priv/seeds/" + filename + ".json", result.seedToSave) : true;
    });
};
const askQuestionsSchema = () => {
    return inquirer.prompt(schema_1.schemaQuestionsData)
        .then(ans => {
        let attributesGenerated = [];
        const attributesQuestions = (previous) => {
            attributesGenerated = previous ? [...attributesGenerated, previous] : [];
            return inquirer.prompt(attributes_1.attributesQuestionsData)
                .then(resp => {
                if (resp.repeat === 'Yes') {
                    return attributesQuestions(resp);
                }
                return Promise.resolve({ ...ans, attributes: [...attributesGenerated, resp] });
            });
        };
        const jsonDefinitionQuestions = () => {
            return inquirer.prompt(json_definition_1.jsonDefinitionQuestionsData);
        };
        return ans.schemaDefinition === 'Individually by attribute' ?
            attributesQuestions() :
            jsonDefinitionQuestions();
    });
};
const askQuestionsData = () => {
    return askQuestionsSeeds({}, true);
};
const success = () => {
    console.log(chalk_1.default.white.bgGreen.bold(`Completed!`));
};
const run = async () => {
    init();
    const answers = await askQuestions();
    const mappedActions = {
        load: start,
        schema: askQuestionsSchema,
        data: askQuestionsData,
    };
    const mappedResult = {
        load: () => { },
        schema: (results) => (0, templates_1.generateSchemaFromResults)(results),
        data: () => { },
        default: (results) => { },
    };
    let result = await mappedActions[answers.actionToDo]();
    const executionWithResult = await mappedResult[answers.actionToDo](result) || await mappedResult['default'](result);
    answers.actionToDo === 'schema' ? await askQuestionsSeeds(executionWithResult) : null;
    success();
};
run();
//# sourceMappingURL=index.js.map