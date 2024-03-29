const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/report/repositories/commands/command');

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

  describe('insertOneReport', () => {

    let payload = {
      ...queryResult
    };

    it('should success add report', async() => {
      const db = {
        setCollection: sinon.stub(),
        insertOne: sinon.stub().resolves(payload)
      };

      const command = new Command(db);
      const res = await command.insertOneReport({});

      assert.equal(res.data.title, payload.data.title);
    });
  });

  describe('updateOneReport', () => {

    let payload = {
      ...queryResult
    };

    it('should success add report', async() => {
      const db = {
        setCollection: sinon.stub(),
        upsertOne: sinon.stub().resolves(payload)
      };

      const command = new Command(db);
      const res = await command.updateOneReport({});

      assert.equal(res.data.title, payload.data.title);
    });
  });

  describe('deleteOneReport', () => {

    let payload = {
      ...queryResult
    };

    it('should success add report', async() => {
      const db = {
        setCollection: sinon.stub(),
        delete: sinon.stub().resolves(payload)
      };

      const command = new Command(db);
      const res = await command.deleteOneReport({});

      assert.equal(res.data.title, payload.data.title);
    });
  });
});

