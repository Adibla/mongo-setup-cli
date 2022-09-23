"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedsQuestionsData = void 0;
const seedsQuestionsData = (askForSeedName) => [
    {
        "name": "choiceSaveSeed",
        "type": "list",
        "when": (ans) => !askForSeedName,
        "message": "Do you want to insert new data for the created schema?",
        "choices": ["Yes", "No"]
    },
    {
        "name": "schemaName",
        "type": "string",
        "when": (ans) => askForSeedName,
        "message": "Enter the entity's name whose data you intend to generate (must match the model name)",
    },
    {
        "name": "seedToSave",
        "type": "editor",
        "when": (answ) => answ.choiceSaveSeed === 'Yes' || askForSeedName,
        "message": "Save the json respecting the schema attributes"
    },
];
exports.seedsQuestionsData = seedsQuestionsData;
//# sourceMappingURL=seeds-qst.js.map