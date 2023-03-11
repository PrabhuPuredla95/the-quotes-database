const { esclient, index, type } = require("../../elastic");

async function getQuotes(req) {
  const query = {
    query: {
      match_bool_prefix: {
        content: {
          query: req.keyword,
          operator: "and",
        },
      },
    },
  };

  const {
    body: { hits },
  } = await esclient.search({
    from: (req.page || 1) - 1,
    size: req.limit || 10,
    index: index,
    type: type,
    body: query,
  });

  const results = hits.total.value;
  const values = hits.hits.map((hit) => {
    return {
      car: `${hit._source.brand} ${hit._source.model} ${hit._source.generation} ${hit._source.engine} ${hit._source.power} ${hit._source.coupe} ${hit._source.fuel} ${hit._source.productionYears} `,
    };
  });

  return {
    results,
    values,
  };
}

async function insertNewQuote(quote, author) {
  return esclient.index({
    index,
    type,
    body: {
      quote,
      author,
    },
  });
}

module.exports = {
  getQuotes,
  insertNewQuote,
};
