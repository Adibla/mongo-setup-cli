import * as Handlebars from "handlebars";

import { capitalizeFirst } from "../string-utils";

const parseDefaultBasedOnTypes = (def, type) => {
  /* ["String", "List", "Boolean", "Number", "ObjectId", "Date", "Buffer", "Decimal", "Mixed"]
   * TODO: check and map missing types
   */
  const mapTypes = {
    "String": (val) => `'${val}'`,
    "default": (val) => val
  }

  const matched = mapTypes[type] || mapTypes['default'];
  return matched(def);
}

const registerCustomHelpers = () => {
  const getSchemaAttribute = (type) =>  {
    const mapAttributes = {
      List: "[]",
      ObjectId: "Schema.Types.ObjectId",
      Decimal: "Schema.Types.Decimal128",
      Mixed: "Schema.Types.Mixed",
      default: type
    }
    return mapAttributes[type] || mapAttributes['default'];
  }


  Handlebars.registerHelper("capitalizeFirst", (value, options) => capitalizeFirst(value));
  Handlebars.registerHelper("attributeFormat", (value, options) => {
    let attributeStringToReturn = `{type:${getSchemaAttribute(value.attributeType)} `;
    attributeStringToReturn = value.attributeIndex === 'Yes' ? `${attributeStringToReturn}, index: true ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceMinValue === 'Yes' ? `${attributeStringToReturn}, min: ${value.minValue} ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceMinValue === 'Yes' ? `${attributeStringToReturn}, max: ${value.maxValue} ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceDefault === 'Yes' ? `${attributeStringToReturn}, default: ${parseDefaultBasedOnTypes(value.defaultValue, value.attributeType)} ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceRequired === 'Yes' ? `${attributeStringToReturn}, required: true ` : `${attributeStringToReturn}`;
    attributeStringToReturn = value.choiceDefaultDate === 'Yes' ? `${attributeStringToReturn}, default: ${Date.now()} ` : `${attributeStringToReturn}`;
    return `${attributeStringToReturn}}`;
  });
}

export { registerCustomHelpers }