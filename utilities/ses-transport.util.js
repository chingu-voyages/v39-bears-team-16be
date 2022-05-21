const nodemailer = require('nodemailer');
const aws = require('@aws-sdk/client-ses');

const ses = new aws.SES({
  region: 'us-east-1',
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

module.exports = transporter;
