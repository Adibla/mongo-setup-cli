#! /usr/local/bin/node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");

const start = require("../src")
const {generateSchemaFromResults} = require("../src/templates");

const startQuestionsData = require('./questions-data/start.js');
const seedsQuestionsData = require('./questions-data/seeds-qst');
const schemaQuestionsData = require('./questions-data/schema');
const attributesQuestionsData = require('./questions-data/attributes');
const jsonDefinitionQuestionsData = require('./questions-data/json-definition');

const { autoGenSeed } = require('../src/utils/faker-utils');
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

const askQuestionsSeeds = async (previousResults, askForSeedName) => {
  const qst = seedsQuestionsData(askForSeedName)
  return inquirer.prompt(qst)
    .then(e => {
      return autoGenSeed(previousResults)
        .then(res => {
          return Promise.resolve({
            ...e,
            seedToSave: res
          })
        })

    })
    .then(result => {
      let filename = previousResults.schemaName||result.schemaName
      return result.seedToSave ? fs.promises.writeFile("./priv/seeds/"+filename+".json", result.seedToSave) : true
    });
};

const askQuestionsSchema = () => {
  return inquirer.prompt(schemaQuestionsData)
    .then(ans => {
      let attributesGenerated = [];

      const attributesQuestions = (previous) => {
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

const success = filepath => {
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
    schema: (results) => generateSchemaFromResults(results),
    data: () => {},
    default: () => {},
  }

  let result = await mappedActions[answers.actionToDo]();

  const executionWithResult = await mappedResult[answers.actionToDo](result) || await mappedResult['default'](result)

  answers.actionToDo === 'schema' ? await askQuestionsSeeds(executionWithResult) : null;

  success();
};

run();
