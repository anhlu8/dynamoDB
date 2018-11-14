const AWS = require("aws-sdk");
const listOfBusiness = [
    "Harper’s Garden",
    "R&D",
    "Bok Bar",
    "Dim Sum & Noodle",
    "Xiandu Thai"
];
function deployScraper(businessName) {
  const lambda = new AWS.Lambda({
    region: "us-east-1"
  });

  const params = {
    FunctionName: "yelp-scrapper-serverless-dev-scrape",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(businessName)
  };

  return lambda.invoke(params, function(error, data) {
    if (error) {
      console.error(JSON.stringify(error));
      return new Error(`Error scraping: ${JSON.stringify(error)}`);
    } else if (data) {
      console.log(data);
      return JSON.stringify(data);
    }
  });
}

function swarm(arr) {
  arr.forEach(businessName => {
    deployScraper(businessName);
  });
}

swarm(listOfBusiness);
