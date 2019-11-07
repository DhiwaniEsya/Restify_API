const sinon = require('sinon');

const reportHandler = require('../../../../../bin/modules/report/handlers/api_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandHandler = require('../repositories/commands/command_handler');
const validator = require('../utils/validator');


describe(__filename, () => {

  let req, res;

  beforeEach(() => {
    res = {
      send: sinon.stub()
    };
    req = {
      body: {}
    };
  });

  describe('insertReport', () => {

    it('should return error validation', () => {
      sinon.stub(validator, 'isValidAddReport').resolves({ err: 'err'});

      reportHandler.insertReport(req, res);
      validator.isValidAddReport.restore();
    });

    it('should return success', async () => {
      sinon.stub(validator, 'isValidAddReport').resolves({ err: null });
      sinon.stub(commandHandler, 'insertReport').resolves({ err: null });

      await reportHandler.insertReport(req, res);
      validator.isValidAddReport.restore();
      commandHandler.insertReport.restore();
    });
  });

  describe('getReport', () => {
    it('should return error', async () => {
      sinon.stub(queryHandler, 'getReport').resolves({ err: 'err' });

      await reportHandler.getReport(req, res);
      queryHandler.getReport.restore();
    });

    it('should return success', async () => {
      sinon.stub(queryHandler, 'getReport').resolves({ err: null });

      await reportHandler.getReport(req, res);
      queryHandler.getReport.restore();
    });
  });
});
