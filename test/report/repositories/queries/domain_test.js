const Report = require('../../../../../../bin/modules/report/repositories/queries/domain');
const query = require('../../../../../../bin/modules/report/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');


describe('viewReport', () => {

  const db = {
    setCollection: sinon.stub()
  };

  const report = new Report(db);

  it('should return report data', async() => {

    /**
     * ini buat expect return query dari domain.js line 14
     * jadi menyesuaikan aja isi dari queryReport di domain.js kek gimana
     *
     * ini contoh aja returnnya kek gini
     */
    let queryResult = {
      'err': null,
      'data': [{
        'reportId': 'bfe1fd4c-d7cf-4913-be86-76ee2593722a',
        'title': 'password salah terus',
        'category': 'app',
        'location': 'kantor smk tel',
        'description': 'gagal login',
        'author': 'staff smk',
        'status': 'terkirim',
        'createdAt': '2019-11-06T10:09:34.011Z'
      }]
    };

    /**
     * findById di ganti query yang di panggil di domain.js yaitu findReport(payload)
     * dimana nanti ketika testing findReport akan me return data queryResult dengan menggunakan fungsi resolves
     */
    sinon.stub(query.prototype, 'findReport').resolves(queryResult);

    const reportId = 'bfe1fd4c-d7cf-4913-be86-76ee2593722a';

    /**
     * Di viewReport data queryResult akan di maping dan di wrapping
     */
    const result = await report.viewReport(reportId);

    /**
     * dikarenakan data berbentuk array maka
     * testnya disini pake array ke[0] karena dilihat dari queryResult di atas itu cuman 1 data
     *
     * dan juga isi titlenya itu 'password salah terus'
     */
    assert.equal(result.data[0].title, 'password salah terus');

    /**
     * ini menghapus sinon.stub di line 41, menyesuaikan apa yang di panggil
     */
    query.prototype.findReport.restore();
  });

  it('should return error', async() => {

    let queryResult = {
      'err': true,
      'data': null
    };

    sinon.stub(query.prototype, 'findReport').resolves(queryResult);

    const reportId = 'bfe1fd4c-d7cf-4913-be86-76ee2593722a';
    const result = await report.viewReport(reportId);
    assert.notEqual(result.err, null);

    query.prototype.findReport.restore();
  });
});
