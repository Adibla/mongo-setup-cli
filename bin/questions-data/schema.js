module.exports = [
  {
    name: "schemaName",
    type: "input",
    message: "What is the name of the model you want to generate?",
  },
  {
    name: "schemaDefinition",
    type: "list",
    message: "How do you want to define your schema?",
    choices: ["Individually by attribute", "Entering a json (mongoose scheme)"]
  }
];
