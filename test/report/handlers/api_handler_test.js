const sinon = require('sinon');

const reportHandler = require('../../../../../bin/modules/report/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/report/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/report/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/report/utils/validator');

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

  describe('updateReport', () => {

    it('should return error validation', () => {
      sinon.stub(validator, 'isValidUpdateReport').resolves({ err: 'err'});

      reportHandler.updateReport(req, res);
      validator.isValidUpdateReport.restore();
    });

    it('should return success', async () => {
      sinon.stub(validator, 'isValidUpdateReport').resolves({ err: null });
      sinon.stub(commandHandler, 'updateReport').resolves({ err: null });

      await reportHandler.updateReport(req, res);
      validator.isValidUpdateReport.restore();
      commandHandler.updateReport.restore();
    });
  });

  describe('deleteReport', () => {
    it('should return error', async () => {
      sinon.stub(commandHandler, 'deleteReport').resolves({ err: 'err' });

      await reportHandler.deleteReport(req, res);
      commandHandler.deleteReport.restore();
    });


    it('should return success', async () => {
      sinon.stub(commandHandler, 'deleteReport').resolves({ err: null });

      await reportHandler.deleteReport(req, res);
      commandHandler.deleteReport.restore();
    });
  });
});
