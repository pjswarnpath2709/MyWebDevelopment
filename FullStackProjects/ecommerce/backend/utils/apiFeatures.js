class ApiFeatures {
  constructor({ query, requestQuery }) {
    this.query = query;
    this.requestQuery = requestQuery;
  }

  search() {
    const { keyword } = this.requestQuery;

    const queryOptions = keyword
      ? {
          name: {
            $regex: keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...queryOptions });

    return this;
  }

  filter() {
    const requestQueryCopy = { ...this.requestQuery };

    const removeFields = ["keyword", "limit", "page"];

    // Remove all this and only get the filter options
    removeFields.forEach((key) => delete requestQueryCopy[key]);

    // Filter for Price and Ratings
    let queryStr = JSON.stringify(requestQueryCopy);

    // replace gt , gte , lt , lte with $gt , $gte , $lt , $lte
    queryStr = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
    );

    this.query = this.query.find(queryStr);

    return this;
  }

  pagination(resultsPerPage = 1) {
    const currentPage = Number(this.requestQuery.page) ?? 1;

    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
