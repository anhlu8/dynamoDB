const request = require('request-promise');

module.exports = businessName => {
    // the businessName param here in this function is the event passed down from the handler.js
    // https://www.yelp.com/biz/pho-ha-philadelphia
    const url = `https://www.yelp.com/biz/${businessName}`;
    return request({
        method: 'GET',
        url: url
    });
};