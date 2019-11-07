

const assert = require('assert');
const sinon = require('sinon');

const Report = require('../../../../../../bin/modules/report/repositories/queries/domain');
const queryHandler = require('../../../../../../bin/modules/report/repositories/queries/query_handler');

describe(__filename, () => {
  const data = {
    success: true,
    data: {
      'reportId': 'bfe1fd4c-d7cf-4913-be86-76ee2593722a',
      'title': 'password salah terus',
      'category': 'app',
      'location': 'kantor smk tel',
      'description': 'gagal login',
      'author': 'staff smk',
      'status': 'terkirim',
      'createdAt': '2019-11-06T10:09:34.011Z'
    },
    message: 'Success Login Report!',
    code: 200
  };

  describe('getReport', () => {

    it('should success get Report', async() => {
      sinon.stub(Report.prototype, 'viewReport').resolves(data);

      const res = await queryHandler.getReport('bfe1fd4c-d7cf-4913-be86-76ee2593722a');

      assert.notEqual(res.data, null);
      assert.equal(res.code, 200);

      Report.prototype.viewReport.restore();
    });
  });
});
