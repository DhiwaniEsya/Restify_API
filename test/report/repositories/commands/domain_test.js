const assert = require('assert');
const sinon = require('sinon');

const command = require('../../../../../../bin/modules/report/repositories/commands/command');
const query = require('../../../../../../bin/modules/report/repositories/queries/query');
const Report = require('../../../../../../bin/modules/report/repositories/commands/domain');

describe(__filename, () => {

  const queryResult = {
    'err': null,
    'data': {
      'reportId': 'bfe1fd4c-d7cf-4913-be86-76ee2593722a',
      'title': 'password salah terus',
      'category': 'app',
      'location': 'kantor smk tel',
      'description': 'gagal login',
      'author': 'staff smk',
      'status': 'terkirim',
      'createdAt': '2019-11-06T10:09:34.011Z'
    }
  };

  const queryResultError = {
    'err': true,
    'data': null,
  };

  const db = {
    setCollection: sinon.stub()
  };

  const report = new Report(db);

  describe('insertReport', () => {

    let payload = {
      ...queryResult
    };
    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves(queryResult);

      const res = await report.insertReport(payload);
      assert.notEqual(res.err, null);

      query.prototype.findOneReport.restore();
    });

    it('should success insert report', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves({ data: null});
      sinon.stub(command.prototype, 'insertOneReport').resolves(queryResult);

      const res = await report.insertReport(payload);
      assert.equal(res.data.title, 'password salah terus');

      query.prototype.findOneReport.restore();
      command.prototype.insertOneReport.restore();
    });
  });

  describe('updateReport', () => {

    let payload = {
      ...queryResult
    };
    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves(queryResultError);

      const res = await report.updateReport(payload);
      assert.notEqual(res.code,404);

      query.prototype.findOneReport.restore();
    });

    it('should success update report', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves(queryResult);
      sinon.stub(command.prototype, 'updateOneReport').resolves(queryResult);

      const res = await report.updateReport(payload);
      assert.equal(res.code,200);

      query.prototype.findOneReport.restore();
      command.prototype.updateOneReport.restore();
    });
    it('should success update report 2', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves(queryResult);
      sinon.stub(command.prototype, 'updateOneReport').resolves(queryResult);

      payload = queryResult.data;
      payload.report_id = 'ui-dsj';

      const res = await report.updateReport(payload);
      assert.equal(res.code,200);

      query.prototype.findOneReport.restore();
      command.prototype.updateOneReport.restore();
    });
  });
  describe('deleteReport', () => {

    let payload = {
      ...queryResult
    };
    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves(queryResultError);

      const res = await report.deleteReport(payload);
      assert.notEqual(res.code,404);

      query.prototype.findOneReport.restore();
    });

    it('should success delete report', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves(queryResult);
      sinon.stub(command.prototype, 'deleteOneReport').resolves(queryResult);

      const res = await report.deleteReport(payload);
      assert.equal(res.code,200);

      query.prototype.findOneReport.restore();
      command.prototype.deleteOneReport.restore();
    });
    it('should error delete report', async() => {
      sinon.stub(query.prototype, 'findOneReport').resolves(queryResult);
      sinon.stub(command.prototype, 'deleteOneReport').resolves(queryResultError);

      payload = queryResult.data;
      const res = await report.deleteReport(payload);
      assert.equal(res.code,500);

      query.prototype.findOneReport.restore();
      command.prototype.deleteOneReport.restore();
    });
  });
});
