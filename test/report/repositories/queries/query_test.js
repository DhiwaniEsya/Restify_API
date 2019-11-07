
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/report/repositories/queries/query');

describe(__filename, () => {

  describe('findOneReport', () => {
    const db = {
      setCollection: sinon.stub(),
      findOne: sinon.stub().resolves({
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
      })
    };

    it('should return success', async() => {
      const query = new Query(db);
      const result = await query.findOneReport({});

      assert.notEqual(result.data, null);
      assert.equal(result.data.title, 'password salah terus');
    });
  });
});
