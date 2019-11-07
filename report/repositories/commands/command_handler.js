const Report = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const report = new Report(db);

const insertReport = async (payload) => {
  const postCommand = async payload => report.insertReport(payload);
  return postCommand(payload);
};

const updateReport = async (payload) => {
  const postCommand = async payload => report.updateReport(payload);
  return postCommand(payload);
};


const deleteReport = async (payload) => {
  const postCommand = async payload => report.deleteReport(payload);
  return postCommand(payload);
};

module.exports = {
  insertReport,
  updateReport,
  deleteReport
};
