
const Report = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const report = new Report(db);

const getReport = async (payload) => {
  const getData = async () =>  report.viewReport(payload);
  return getData();
};

module.exports = {
  getReport
};
