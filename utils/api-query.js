/**
 * @class Generates the logic to return the results matched to a given query,
 */
class APIQuery {
  /**
   *
   * @param {Object} query Values to be compared with the documents inside the collection
   * @param {Query} queryFilter collection which communicates with the DB
   */
  constructor(query, queryFilter) {
    this.query = { ...query };
    this.queryCopy = { ...this.query };
    this.queryFilter = queryFilter;

    // Clean the query with the fields that are used to format the result
    const queryFields = ["sort", "page", "fields", "limit"];
    queryFields.forEach((query) => delete this.queryCopy[query]);

    return this;
  }

  /**
   *
   * @description Changes the values given in the query to a values that are accepted in the mongoose function
   * @example
   *
   * +---------------------------+
   * |  Not Valid  |    Valid    |
   * +-------------+-------------+
   * | { gt: 10 }  | { $gt: 10 } |
   * +-------------+-------------+
   *
   * { age: { gt: 10 } } -> { age: { $gt: 10 } }
   */
  filter() {
    this.query = JSON.parse(
      JSON.stringify(this.query).replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      )
    );

    return this;
  }

  /**
   *
   * @param {Number} [defaultLimit]
   * @param {Number} [defaultPage]
   * @description In case that there were many results, it is possible to specify a number of results
   */
  skip(defaultLimit = 100000, defaultPage = 1) {
    const limit = parseInt(this.query.limit) || defaultLimit;
    const page = parseInt(this.query.page) || defaultPage;
    const skipResults = (page - 1) * limit;

    this.queryFilter.skip(skipResults).limit(limit);

    return this;
  }

  /**
   *
   * @param {String} [defaultSort] Default value to sort results
   * @description Order the elements depending to the value given in the query or the value provided as default
   */
  sort(defaultSort = "name") {
    if (this.query.sort) {
      const sortQuery = this.query.sort.split(",").join(" ");
      this.queryFilter.sort(sortQuery);
    } else {
      this.queryFilter.sort(defaultSort);
    }

    return this;
  }

  /**
   *
   * @param  {...any} [defaultFields] Fields that will be returned in each document
   * @description Return the specific fields that the query specifies
   */
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

  /**
   *
   * @returns All the documents matched with the query
   */
  async endFilter() {
    const results = await this.queryFilter.find(this.queryCopy);

    return results;
  }
}

module.exports = APIQuery;
