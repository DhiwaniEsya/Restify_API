
const uuidv4 = require('uuid/v4');
const Command = require('./command');
const model = require('./command_model');
const Query = require('../queries/query');

const wrapper = require('../../../../helpers/utils/wrapper');
const { BadRequestError, ConflictError, NotFoundError } = require('../../../../helpers/error');

class Report {

  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async insertReport(data) {

    let resultData, payload, reportModel = 'report';

    payload = {
      ...data
    };

    const queryReport = await this.query.findOneReport({ report_id: payload.reportId });
    if (queryReport.data) {
      return wrapper.error(new ConflictError('Report Already Exist!'));
    }

    reportModel = model.report();
    reportModel.report_id = uuidv4(),
    reportModel.title = payload.title;
    reportModel.category = payload.category;
    reportModel.location = payload.location;
    reportModel.description = payload.description;
    reportModel.author = payload.author;
    reportModel.status = 'terkirim';
    reportModel.created_at = new Date().toISOString();

    const { data:result } = await this.command.insertOneReport(reportModel);

    resultData = model.resultReport();
    resultData.reportId = result.report_id;
    resultData.title = result.title;
    resultData.category = result.category;
    resultData.location = result.location;
    resultData.description = result.description;
    resultData.author = result.author;
    resultData.status = result.status;
    resultData.createdAt = result.created_at;
    return wrapper.data(resultData);

  }
  async updateReport(data) {
    let payload, result = 'report';

    payload = {
      ...data
    };

    const queryReport = await this.query.findOneReport({ report_id: payload.reportId });
    if (queryReport.err) {
      return wrapper.error(new NotFoundError('Report Not Found!'));
    }

    (payload.report_id) ? queryReport.report_id = payload.report_id : queryReport.report_id = queryReport.data.report_id;
    (payload.author) ? queryReport.author = payload.author : queryReport.author = queryReport.data.author;
    (payload.category) ? queryReport.data.category = payload.category : '';
    (payload.description) ? queryReport.data.description = payload.description : '';

    const { data:update } = await this.command.updateOneReport(queryReport.data);

    result = model.resultReport();
    result.reportId = update.report_id;
    result.title = update.title;
    result.category = update.category;
    result.location = update.location;
    result.description = update.description;
    result.author = update.author;
    result.status = update.status;
    result.createdAt = update.created_at;
    return wrapper.data(result);
  }
  async deleteReport(data) {
    let payload = 'report';

    payload = {
      report_id: data.reportId
    };

    const queryReport = await this.query.findOneReport(payload);
    if (queryReport.err) {
      return wrapper.error(new NotFoundError('Report Not Found!'));
    }

    const deleteReport = await this.command.deleteOneReport(payload);
    if (deleteReport.err) {
      return wrapper.error(new BadRequestError('Error Deleting Report!'));
    }

    return wrapper.data('');
  }
}
module.exports = Report;
