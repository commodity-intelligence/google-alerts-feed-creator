const alerts = require('../src/alerts.js');

const { HOW_OFTEN, DELIVER_TO, HOW_MANY, SOURCE_TYPE } = alerts;

function configure (config) {
    // Mock implementation for the configure method
    console.log('Configuring API with:', config);
    // You can add any logic related to the configuration here
}

function create (alertToCreate, callback) {
    const mockAlert = {
        name: alertToCreate.name,
        howOften: 2,
        sources: '[null,null,null]',
        lang: 'any',
        region: 'any',
        howMany: 2,
        deliverTo: 2,
        deliverToData: '',
        id: '41b31f219c35ce47:3e7c0a60ef763238:com:any:US',
        rss: 'https://google.com/alerts/feeds/08149589272187065929/4810783767477939930'
    };

    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
        callback(null, mockAlert);
    }, 0);
}

// This is a placeholder for other functions in the `api` object
// You can add other functions as needed
function sync(callback) {
    // Simulate another asynchronous operation
    setTimeout(() => {
        callback();
    }, 0);
}

module.exports = {
    HOW_OFTEN, DELIVER_TO, HOW_MANY, SOURCE_TYPE,
    configure,
    sync,
    create,
};