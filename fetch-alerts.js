const nconf = require('nconf');
const alerts = require('./index.js');
const Papa = require('papaparse');
const fs = require('fs');

const { HOW_OFTEN, DELIVER_TO, HOW_MANY, SOURCE_TYPE } = alerts;
nconf.argv()
    .env()
    .file({ file: './config.json' });

const COOKIES = nconf.get('cookies');

alerts.configure({
    cookies: COOKIES
});

alerts.sync((err) => {
    if(err) return console.log(err);
    const alertList = alerts.getAlerts();
    printAlertInfo(alertList);
});

function printAlertInfo(alert) {
    // Convert array to JSON string
    let jsonData = JSON.stringify(alert, null, 2);

    // Specify the file path
    let filePath = 'output.json';

    fs.appendFileSync(filePath, jsonData, (err) => {
        if (err) throw err;
    });

    console.log(`Data has been written to ${filePath}`);
}