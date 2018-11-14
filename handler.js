'use strict';

const {getPage, parsePage, saveRatingsToDB} = require('./utils');

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

//sls invoke local -f scrape -d "pho-ha-philadelphia"