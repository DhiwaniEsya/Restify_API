
const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const commandHandler = require('../repositories/commands/command_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-error/custom_error');

const insertReport = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body
  };
  const validatePayload = await validator.isValidAddReport(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.insertReport(payload);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Can not Add new Report!', httpError.BAD_REQUEST)
      : wrapper.response(res, 'success', result, 'Success Add new Report', http.OK);
  };
  sendResponse(await postRequest(validatePayload));

};

const updateReport = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body
  };

  const validatePayload = await validator.isValidUpdateReport(payload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateReport(payload);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Can not Update Report!', httpError.BAD_REQUEST)
      : wrapper.response(res, 'success', result, 'Success Update Report', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};


const deleteReport = async (req, res) => {
  const payload = req.params;

  const deleteRequest = async () => commandHandler.deleteReport(payload);

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Delete Report', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Success Delete Report!', http.OK);
  };
  sendResponse(await deleteRequest());
};

const getReport = async (req, res) => {
  const payload = req.query;

  const getData = async () => queryHandler.getReport(payload);

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Report', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Success Get Report!', http.OK);
  };
  sendResponse(await getData());
};


module.exports = {
  insertReport,
  updateReport,
  deleteReport,
  getReport
};
