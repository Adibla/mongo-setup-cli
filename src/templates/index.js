const fs = require('fs');
const Handlebars = require('handlebars');
const handlebarsHelpers = require('handlebars-helpers');

const { capitalizeFirst } = require("../utils/string-utils");
const { registerCustomHelpers } = require('../utils/handlebars-utils');

registerCustomHelpers();
handlebarsHelpers();

const generateSchemaFromResults = async (results) => {
  return fs.promises.readFile(__dirname+"/base/schema.hbs")
    .then(source => {
      const template = Handlebars.compile(source.toString())
      const context = {
        results: results
      }
      const content = template(context)
      return fs.promises.writeFile("./src/models/"+results.schemaName+".js", content)
    })
    .then(fileWrit => {
      return fs.promises.readFile("./src/models/index.js")
    })
    .then(fileContent => {
      const compiledIndex = Handlebars.compile(fileContent.toString().replace(/\/\//g, ''))
      const contentModelToWrite = compiledIndex({requiredSchema: "const "+capitalizeFirst(results.schemaName)+" = require('./"+results.schemaName+"')\r\n//{{{requiredSchema}}}", nameSchema: capitalizeFirst(results.schemaName)+",\r\n//{{nameSchema}}"})
      return fs.promises.writeFile("./src/models/index.js", contentModelToWrite).then(d => results)
    })

}

module.exports = {
  generateSchemaFromResults
}
