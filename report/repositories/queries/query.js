
class Query {

  constructor(db) {
    this.db = db;
  }

  async findOneReport(parameter) {
    this.db.setCollection('report');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findReport(parameter) {
    this.db.setCollection('report');
    const recordset = await this.db.findMany(parameter);
    return recordset;
  }

}

module.exports = Query;
