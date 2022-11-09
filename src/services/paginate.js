export default async (model, pageSize, pageLimit, search = {}, others = {}) => {
  try {
    const limit = parseInt(pageLimit, 10) || 10;
    const page = parseInt(pageSize, 10) || 1;

    // create an options object
    let options = {
      ...others,
      offset: page * limit - limit,
      limit: limit,
      distinct: true
    };

    // check if the search object is empty
    if (Object.keys(search).length) {
      options = { ...options, ...search };
    }

    // take in the model, take in the options
    let { count, rows } = await model.findAndCountAll(options);

    return [
      {
        info: {
          previousPage: page <= 1 ? null : page - 1,
          currentPage: page,
          nextPage: count / limit > page ? page + 1 : null,
          total: count,
          limit: limit
        },
        results: rows
      },
      null
    ];
  } catch (error) {
    return [null, error];
  }
};
