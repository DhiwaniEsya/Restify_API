const joi = require('joi');
const wrapper = require('../../../helpers/utils/wrapper');
const { BadRequestError } = require('../../../helpers/error');


const isValidAddReport = async (payload) => {
  const reportSchema = joi.object({
    report_id: joi.string(),
    title: joi.string().required(),
    category: joi.string().required(),
    location: joi.string().required(),
    description: joi.string().required(),
    author: joi.string().required(),
    status: joi.string()
  }).label('Add Report');
  const result = joi.validate(payload, reportSchema);

  if (result.error) {
    const message = result.error.details[0].message;
    return wrapper.error(new BadRequestError(message));
  }
  return wrapper.data(true);
};

const isValidUpdateReport = async (payload) => {
  const reportSchema = joi.object({
    reportId: joi.string().required(),
    title: joi.string().allow(null),
    category: joi.string().allow(null),
    location: joi.string().allow(null),
    description: joi.string().allow(null),
    author: joi.string().allow(null),
    status: joi.string().allow(null),
    createdAt:joi.allow(null)
  }).label('Update Report');
  const result = joi.validate(payload, reportSchema);

  if (result.error) {
    const message = result.error.details[0].message;
    return wrapper.error(new BadRequestError(message));
  }
  return wrapper.data(true);
};


module.exports = {
  isValidAddReport,
  isValidUpdateReport
};
