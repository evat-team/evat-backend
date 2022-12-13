class APIQuery {
  constructor(query, queryFilter) {
    this.query = { ...query };
    this.queryCopy = { ...this.query };
    this.queryFilter = queryFilter;

    const queryFields = ["sort", "page", "fields", "limit"];
    queryFields.forEach((query) => delete this.queryCopy[query]);

    return this;
  }

  filter() {
    this.query = JSON.parse(
      JSON.stringify(this.query).replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      )
    );

    return this;
  }

  skip(defaultLimit = 50, defaultPage = 1) {
    const limit = parseInt(this.query.limit) || defaultLimit;
    const page = parseInt(this.query.page) || defaultPage;
    const skipResults = (page - 1) * limit;

    this.queryFilter.skip(skipResults).limit(limit);

    return this;
  }

  sort(defaultSort = "createdAt") {
    if (this.query.sort) {
      const sortQuery = this.query.sort.split(",").join(" ");
      this.queryFilter.sort(sortQuery);
    } else {
      this.queryFilter.sort(defaultSort);
    }

    return this;
  }

  fields(...defaultFields) {
    if (this.query.fields) {
      const fieldsQuery = this.query.fields.split(",").join(" ");
      this.queryFilter.select(fieldsQuery);
    } else {
      const fieldsDefault = defaultFields.join(" ");
      this.queryFilter.select(fieldsDefault);
    }

    return this;
  }

  async endFilter() {
    const results = await this.queryFilter.find(this.queryCopy);

    return results;
  }
}

module.exports = APIQuery;
