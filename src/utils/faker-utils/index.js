const faker = require("@faker-js/faker");

const autoGenSeed = (schema) => {
  return new Promise((res, rej) => {
    const mapAction = (data) => {
      return {
        String: faker.faker.datatype.string(),
        Boolean: faker.faker.datatype.boolean(),
        Number: faker.faker.datatype.number({min: data.min || 1, max:data.max || 9999999}),
        ObjectId: faker.faker.datatype.uuid(),
        Decimal: faker.faker.datatype.float(),
        Date: faker.faker.datatype.datetime(),
        List: [1,2,3]
      }
    }

    const data = schema.attributes.map(el => {
      return el.choiceDefault === 'Yes' ? el.defaultValue : mapAction(el)[el.attributeType]
    })

    return res(JSON.stringify(data))
  })
}

module.exports = {
  autoGenSeed
}