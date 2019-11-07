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

});
