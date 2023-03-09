const elastic = require("../elastic");
// const quotes = require(`./quotes.json`);
const cars = require(`./data.json`);
const { handleEngine, handleTitle, getYears } = require("./util");

/**
 * @function createESAction
 * @returns {{index: { _index: string, _type: string }}}
 * @description Returns an ElasticSearch Action in order to
 *              correctly index documents.
 */

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type,
  },
};

/**
 * @function pupulateDatabase
 * @returns {void}
 */

async function populateDatabase1() {
  let docs = [];

  let i = 0;
  for (const brand of cars.brands.brand) {
    for (const model of brand.models.model) {
      for (const generation of model.generations.generation) {
        for (const modification of generation.modifications.modification) {
          docs.push(esAction);
          const x = {
            ...modification,
            ...generation,
            content: `${handleTitle(modification.brand)} ${handleTitle(
              modification.generation
            )} ${handleEngine(modification.engine)} ${modification.fuel} ${
              modification.coupe
            } ${getYears(modification.yearstart, modification.yearstop)}`,
          };

          docs.push(x);
          // console.log("uploading cars", x);
          if (docs.length === 100) {
            await elastic.esclient.bulk({ body: docs });
            console.log("uploaded cars", i + 1);
            i += 1;
            docs = [];
          }
        }
      }
    }
  }
  console.log("uploading last cars", docs.length);
  return await elastic.esclient.bulk({ body: docs });
}
// populateDatabase1();

async function populateDatabase() {
  const docs = [];

  for (const quote of quotes) {
    console.log("creating quote", quote);
    docs.push(esAction);
    docs.push(quote);
  }

  return elastic.esclient.bulk({ body: docs });
}

module.exports = {
  populateDatabase,
};
