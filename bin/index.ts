#! /usr/local/bin/node

import * as inquirer from "inquirer";
import chalk from "chalk";
import * as figlet from "figlet";
import * as fs from "fs";

import * as start from "../src"
import { generateSchemaFromResults } from "../src/templates";

import { startQuestionsData } from "./questions-data/start";
import { seedsQuestionsData } from "./questions-data/seeds-qst";
import { schemaQuestionsData } from "./questions-data/schema";
import { attributesQuestionsData } from "./questions-data/attributes";
import { jsonDefinitionQuestionsData } from "./questions-data/json-definition";

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Mongo setup CLI", {
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const askQuestions = () => {
  return inquirer.prompt(startQuestionsData);
};

const askQuestionsSeeds = async (previousResults?: any, askForSeedName?: boolean) => {
  const qst = seedsQuestionsData(askForSeedName)
  return inquirer.prompt(qst)
    .then(result => {
      let filename = previousResults.schemaName||result.schemaName
      return result.seedToSave ? fs.promises.writeFile("./priv/seeds/"+filename+".json", result.seedToSave) : true
    });
};

const askQuestionsSchema = () => {
  return inquirer.prompt(schemaQuestionsData)
    .then(ans => {
      let attributesGenerated: any = [];

      const attributesQuestions: any = (previous) => {
        attributesGenerated  = previous ? [...attributesGenerated, previous] : [];
        return inquirer.prompt(attributesQuestionsData)
        .then(resp => {
          if(resp.repeat === 'Yes'){
            return attributesQuestions(resp);
          }
          return Promise.resolve({...ans, attributes: [...attributesGenerated, resp]})
        })
      }

      const jsonDefinitionQuestions = () => {
        return inquirer.prompt(jsonDefinitionQuestionsData)
      }

      return ans.schemaDefinition === 'Individually by attribute' ?
        attributesQuestions() :
        jsonDefinitionQuestions()
    });
};

const askQuestionsData = () => {
  return askQuestionsSeeds({}, true)
};

const success = () => {
  console.log(
    chalk.white.bgGreen.bold(`Completed!`)
  );
};


const run = async () => {
  init();

  const answers = await askQuestions();

  const mappedActions = {
    load: start,
    schema: askQuestionsSchema,
    data: askQuestionsData,
  }

  const mappedResult = {
    load: () => {},
    schema: (results: any) => generateSchemaFromResults(results),
    data: () => {},
    default: (results) => {},
  }

  let result: any = await mappedActions[answers.actionToDo]();

  const executionWithResult = await mappedResult[answers.actionToDo](result) || await mappedResult['default'](result)

  answers.actionToDo === 'schema' ? await askQuestionsSeeds(executionWithResult) : null;

  success();
};

run();
