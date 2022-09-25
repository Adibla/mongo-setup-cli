module.exports = (askForSeedName) => [
  {
    "name": "choiceSaveSeed",
    "type": "list",
    "when": (ans) => !askForSeedName,
    "message": "Do you want to insert new data for the created schema?",
    "choices": ["Yes", "No"]
  },
  {
    "name": "choiceAutoGenSeed",
    "type": "list",
    "when": (ans) => !askForSeedName && ans.choiceSaveSeed === 'Yes',
    "message": "Do you want to autogenerate new data for the created schema?",
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
    "when": (answ) => (answ.choiceSaveSeed === 'Yes' || askForSeedName) && answ.choiceSaveSeed === 'No',
    "message": "Save the json respecting the schema attributes"
  },
]