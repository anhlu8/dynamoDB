'use strict';

const {getPage, parsePage, saveRatingsToDB, deployScrapers} = require('./utils');

//sls invoke local -f scrape -d "pho-ha-philadelphia"
module.exports.scrape = async (event, context) => {
  //1. Fetch yelp page
  getPage(event)
    //2. Parse the page
    .then(res => parsePage(res))
    //3. Save ratings data to our db
    .then(res => saveRatingsToDB(res, event))
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function executed successfully!',
          input: event,
        })
      };
    })
    .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
};



module.exports.launch_scrapers = async (event, context) => {
  //list of business names
  const listOfBusiness = [
    "Harper’s Garden",
    "R&D",
    "Bok Bar",
    "Dim Sum & Noodle",
    "Xiandu Thai"
  ];

  //launch a lambda function for each business name
  listOfBusiness.forEach(businessName => {
    deployScrapers(businessName);
  })
};