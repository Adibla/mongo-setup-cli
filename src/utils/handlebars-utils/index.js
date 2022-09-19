const Handlebars = require("handlebars");
const {capitalizeFirst} = require("../string-utils");

const registerCustomHelpers = () => {
  const getSchemaAttribute = (type) =>  {
    const mapAttributes = {
      List: "[]",
      ObjectId: "Schema.Types.ObjectId",
      default: type
    }
    return mapAttributes[type] || mapAttributes['default'];
  }


  Handlebars.registerHelper("capitalizeFirst", (value, options) => capitalizeFirst(value));
  Handlebars.registerHelper("attributeFormat", (value, options) => {
    let attributeStringToReturn = `{type :${getSchemaAttribute(value.attributeType)}`;
    attributeStringToReturn = value.attributeIndex === 'Si' ? `${attributeStringToReturn}, index: true ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceMinValue === 'Si' ? `${attributeStringToReturn}, min: ${value.minValue} ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceMinValue === 'Si' ? `${attributeStringToReturn}, max: ${value.maxValue} ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceDefaultDate === 'Si' ? `${attributeStringToReturn}, default: ${Date.now()} ` : `${attributeStringToReturn}`;
    return `${attributeStringToReturn}}`;
  });
}

module.exports = { registerCustomHelpers }