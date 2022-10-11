const nodemailer = require('nodemailer');
import * as aws from '@aws-sdk/client-ses';

const ses = new aws.SES({
  region: 'us-east-1',
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export default transporter;