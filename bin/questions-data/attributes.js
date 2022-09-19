module.exports = [
  {
    type: 'input',
    name: 'attribute',
    message: 'Enter the attribute name',
  },
  {
    type: 'list',
    name: 'attributeType',
    message: 'Enter the attribute type',
    choices: ["String", "List", "Boolean", "Number", "ObjectId", "Date"]
  },
  {
    type: 'list',
    name: 'choiceAttributeTypeList',
    message: 'Do you want to specify the type of data that will be inserted in the list?',
    when: (answ) => answ.attributeType === 'List',
    choices: ["Yes", "No"]
  },
  {
    type: 'list',
    choices: ["String", "Boolean", "Number", "ObjectId", "Date"],
    name: 'attributeTypeList',
    message: 'Enter the type of data that will be inserted in the list',
    when: (answ) => answ.choiceAttributeTypeList === 'Yes',
  },
  {
    type: 'list',
    name: 'choiceDefaultDate',
    message: 'Do you want the default date to be today?',
    choices: ["Yes", "No"],
    when: (answ) => answ.attributeType === 'Date',
  },
  {
    type: 'list',
    name: 'choiceMinValue',
    message: 'Do you want to set a min value?',
    choices: ["Yes", "No"],
    when: (answ) => answ.attributeType === 'Number',
  },
  {
    type: 'list',
    name: 'choiceMaxValue',
    message: 'Do you want to set a max value?',
    choices: ["Yes", "No"],
    when: (answ) => answ.attributeType === 'Number',
  },
  {
    type: 'number',
    name: 'minValue',
    message: 'Enter min value',
    when: (answ) => answ.choiceMinValue === 'Yes',
  },
  {
    type: 'number',
    name: 'maxValue',
    message: 'Enter max value',
    when: (answ) => answ.choiceMaxValue === 'Yes',
  },
  {
    type: 'list',
    name: 'attributeIndex',
    when:(answ) => answ.attributeType !== 'ObjectId',
    message: 'Do you want to create an index for the attribute?',
    choices: ["Yes", "No"]
  },
  {
    type: 'list',
    name: 'repeat',
    message: 'Do youn want to create another attribute?',
    choices: ["Yes", "No"]
  }]