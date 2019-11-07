
const assert = require('assert');
const sinon = require('sinon');

const Report = require('../../../../../../bin/modules/report/repositories/commands/domain');
const commandHandler = require('../../../../../../bin/modules/report/repositories/commands/command_handler');


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
    message: 'Success Add Report!',
    code: 200
  };

  const payload = {
    ...data
  };


  describe('insertReport', () => {

    it('should info success insert report', async() => {
      sinon.stub(Report.prototype, 'insertReport').resolves(data);

      const res = await commandHandler.insertReport(payload);

      assert.notEqual(res.data, null);
      assert.equal(res.code, 200);

      Report.prototype.insertReport.restore();
    });
  });
});

