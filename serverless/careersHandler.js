/* eslint-disable no-console */

const nodemailer = require('nodemailer');
const multipart = require('aws-lambda-multipart-parser');

const emailTemplate = `
<body>
    <p>A new job application has been submitted in the website:</p>
    <br>
    <p><strong>Name:</strong> {{name}}</p>
    <p><strong>Email Address:</strong> {{email}}</p>
    <p><strong>Phone Number:</strong> {{phone}}</p>
    <p><strong>Cover Letter:</strong></p>
    <p>{{coverLetter}}</p>
</body>
`;

function sendMail(data) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports,
    connectionTimeout: 5000,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  // const transporter = nodemailer.createTransport({
  //   host: 'mail.diyar.bh',
  //   port: 25,
  //   secure: true, // true for 465, false for other ports,
  //   connectionTimeout: 5000,
  //   auth: {
  //     user: 'career@diyar.bh',
  //     pass: 'Diyar@123',
  //   },
  // });

  const emailBody =
    emailTemplate
      .replace(/{{name}}/g, data.name)
      .replace(/{{email}}/g, data.email)
      .replace(/{{phone}}/g, data.phone)
      .replace(/{{coverLetter}}/g, data.coverLetter);


  const mailOptions = {
    from: '"Diyar" <corpcomm@diyar.bh>',
    to: 'career@diyar.bh',
    subject: 'Job Application (Diyar Website)',
    html: emailBody,
  };
  
  if (data.cv && data.cv.filename && data.cv.content) {
    mailOptions.attachments = [
      {
        filename: data.cv.filename,
        content: data.cv.content,
        contentType: data.cv.contentType,
        encoding: 'binary',
      },
    ];
  }
  console.log(mailOptions);
  // send mail with defined transport object
  return transporter.sendMail(mailOptions,function(err,response){
    if(err){
      console.log(err);
    }
  });
}

module.exports.handleFormData = async (event) => {
  const parsedBody = new Buffer(event.body, 'base64').toString('binary');

  event.body = parsedBody; // eslint-disable-line no-param-reassign

  const data = multipart.parse(event, false);

  const ENV_ORIGINS = process.env.CORS_ALLOWED_ORIGINS || '';
  const ALLOWED_ORIGINS = ENV_ORIGINS.split('|').map(origin => `https://${origin.toLowerCase()}`);
  const origin = event.headers.origin.toLowerCase();
  let responseHeaders = {};

  if (ALLOWED_ORIGINS.includes(origin)) {
    responseHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    };
  }

  try {
    const info = await sendMail(data);
    //console.log('Message sent: %s', info.messageId);
    return { statusCode: 202, headers: responseHeaders };
  } catch (error) {
    //console.error('Error while sending email', error);
    return { statusCode: 501, headers: responseHeaders };
  }
};
