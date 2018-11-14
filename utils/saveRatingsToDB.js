const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = (yelpData, businessName) => {
    const data = JSON.stringify(new Date());
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            businessName:businessName,
            reviewCount: yelpData.reviewCount,
            rating: yelpData.rating,
            scrapedAt: data
        }
    };

    dynamoDB.put(params, err => {
        if(err){
            console.err(`Error saving data to DynamoDB: ${JSON.stringify(err)}`);
            return Promise.reject(`Error saving data to DynamoDB: ${JSON.stringify(err)}`);
        }return Promise.resolve(params.Item)
    });
};