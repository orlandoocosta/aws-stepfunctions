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
  let type;
  try {
    if (event.id == "67890") {
      type = "VIDEO_GAMES";
    }else{
    type = "CLOTHES"}

    console.log("Order " + event.id + " created with type " + type);
    return { status: "CREATED", type: type };
    
  } catch (err) {
    console.log(err);
    return err;
  }
};
