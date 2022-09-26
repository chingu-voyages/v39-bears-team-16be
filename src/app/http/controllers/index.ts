export { default as ClassworkController } from './classworkController';
export { default as EnrolmentController } from './enrolmentController';

const classController = require('./class.controller');
const likeController = require('./like.controller');
const planController = require('./plan.controller');

module.exports = {
  classController,
  likeController,
  planController,
};
