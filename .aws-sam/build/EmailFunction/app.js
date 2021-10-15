let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    console.log("order number " + event.requestContext.orderNumber);
    console.log(" Send email for " + event.requestContext.target);
    console.log(
      " With config " + JSON.stringify(event.requestContext.emailConfiguration)
    );

    response =
      "order number " +
      event.requestContext.orderNumber +
      " Send email for " +
      event.requestContext.target +
      " With config " +
      JSON.stringify(event.requestContext.emailConfiguration);
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
