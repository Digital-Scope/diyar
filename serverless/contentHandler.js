/* eslint-disable no-console */

const AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  let responseCode = 200;

  console.log('request', event);

  console.log('Initiating CodePipeline');

  const codepipeline = new AWS.CodePipeline({ apiVersion: '2015-07-09' });
  const codePipelineExecutionConfig = {
    name: 'diyar-almuharraq-website_production',
  };

  codepipeline.startPipelineExecution(codePipelineExecutionConfig, (err, data) => {
    if (err) {
      responseCode = 500;

      console.log(`Failed to start codepipeline for ${codePipelineExecutionConfig.name}`, err); // an error occurred
    } else {
      console.log(`Started build for ${codePipelineExecutionConfig.name}`, data); // successful response
    }
  });

  console.log('Initiating CloudFront invalidation');

  // invalidate cloudfront cache
  const cloudFront = new AWS.CloudFront();
  const cloudFrontParams = {
    DistributionId: 'E2GADZCKM0OKIV',
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 1,
        Items: [
          '/*',
        ],
      },
    },
  };

  cloudFront.createInvalidation(cloudFrontParams, (err, data) => {
    if (err) {
      responseCode = 500;

      console.log(`Failed to create CloudFront invalidation for ${cloudFrontParams.DistributionId}`, err); // an error occurred
    } else {
      console.log(`Invalidated CloudFront ${cloudFrontParams.DistributionId}`, data); // successful response
    }
  });

  const ENV_ORIGINS = process.env.CORS_ALLOWED_ORIGINS || '';
  const ALLOWED_ORIGINS = ENV_ORIGINS.split('|');
  const origin = event.headers.origin;
  let responseHeaders;

  if (ALLOWED_ORIGINS.includes(origin)) {
    responseHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    };
  } else {
    responseHeaders = {
      'Access-Control-Allow-Origin': '*',
    };
  }

  const response = {
    statusCode: responseCode,
    headers: responseHeaders,
    body: JSON.stringify({}),
  };

  console.log('response', response);

  callback(null, response);
};
