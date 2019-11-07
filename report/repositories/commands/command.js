
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneReport(document) {
    this.db.setCollection('report');
    const result = await this.db.insertOne(document);
    return result;
  }

  async updateOneReport(document) {
    this.db.setCollection('report');
    const result = await this.db.upsertOne({report_id: document.report_id}, document);
    return result;
  }

  async deleteOneReport(document) {
    this.db.setCollection('report');
    const result = await this.db.delete({report_id : document.report_id}, document);
    return result;
  }

}

module.exports = Command;
