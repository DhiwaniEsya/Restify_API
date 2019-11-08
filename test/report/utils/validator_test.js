
const joi = require('joi');
const sinon = require('sinon');

const validator = require('../../../../../bin/modules/report/utils/validator');

describe(__filename, () => {

  describe('valid insert Report', () => {

    it('Should fail insert Report', () => {
      validator.isValidAddReport(false);
    });

    it('Should success insert', async () => {
      sinon.stub(joi, 'validate').resolves({ error: null });
      validator.isValidAddReport();

      joi.validate.restore();
    });
  });

  describe('valid update Report', () => {

    it('Should fail update report', async () => {
      validator.isValidUpdateReport(false);
    });

    it('Should success update report', async () => {
      sinon.stub(joi, 'validate').resolves({ error: null });
      validator.isValidUpdateReport();

      joi.validate.restore();
    });
  });
});
