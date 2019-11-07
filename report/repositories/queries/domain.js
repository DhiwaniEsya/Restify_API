
const Query = require('./query');
const model = require('./query_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class Report {

  constructor(db) {
    this.query = new Query(db);
  }

  async viewReport(payload) {
    const queryReport = await this.query.findReport(payload);
    if (queryReport.err) {
      return wrapper.error(new NotFoundError('Can not Find Report!'));
    }

    let arrData = [];

    const map = queryReport.data.map(async value => {
      const resultReq = model.resultReport();
      resultReq.reportId = value.report_id;
      resultReq.title = value.title;
      resultReq.category = value.category;
      resultReq.location = value.location;
      resultReq.description = value.description;
      resultReq.author = value.author;
      resultReq.status = value.status;
      arrData.push(resultReq);
    });

    await Promise.all(map);

    return wrapper.data(arrData);
  }

}

module.exports = Report;
