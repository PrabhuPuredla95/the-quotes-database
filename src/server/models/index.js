const { esclient, index, type } = require("../../elastic");

async function getQuotes(req) {
  const query = {
    query: {
      match: {
        content: {
          query: req.text,
          operator: "and",
        },
      },
    },
  };

  const {
    body: { hits },
  } = await esclient.search({
    from: req.page || 0,
    size: req.limit || 100,
    index: index,
    type: type,
    body: query,
  });

  const results = hits.total.value;
  const values = hits.hits.map((hit) => {
    return {
      car: hit._source.content,
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
