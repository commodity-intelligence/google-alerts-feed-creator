const nconf = require('nconf');
const api = require('./index.js');
const Papa = require('papaparse');
const fs = require('fs');

const { HOW_OFTEN, DELIVER_TO, HOW_MANY, SOURCE_TYPE } = api;

const TIMEOUT_MS = 100 * 1000;

nconf.argv()
    .env()
    .file({ file: './config.json' });

const COOKIES = nconf.get('cookies');

api.configure({
    cookies: COOKIES
});

const csvData = fs.readFileSync('topics.csv', 'utf8');
const results = Papa.parse(csvData, { header: true }).data;
const topics = results.map(row => row.topics);

const alertsToCreate = topics.map((topic, index) => ({
  id: results[index].id, 
  name: topic,
  howOften: HOW_OFTEN.AT_MOST_ONCE_A_DAY,
  sources: SOURCE_TYPE.AUTOMATIC,
  lang: 'en',
  region: 'any',
  howMany: HOW_MANY.ALL,
  deliverTo: DELIVER_TO.RSS,
  deliverToData: '',
}));

api.sync(() => {
  let alerts = [];
  let alertPromises = [];

  function createAlert(topic) {
    return new Promise((resolve, reject) => {
      api.create(topic, (err, alert) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          alert.id = topic.id;
          alerts.push(alert);
          resolve(alert);
        }
      });
    });
  }


  alertsToCreate.forEach(alert => {
    let alertPromise = createAlert(alert);
    alertPromises.push(alertPromise);
  });

  // Wait for all promises to resolve
  Promise.all(alertPromises)
    .then(() => {
      // All alerts have been created
      // Continue with the rest of your script here
      // You can put the code that depends on the alert data here

      // Convert array to JSON string
      let jsonData = JSON.stringify(alerts, null, 2);

      // Specify the file path
      let filePath = 'output.json';

      // Write to the file
      fs.writeFileSync(filePath, jsonData, 'utf-8');

      console.log(`Data has been written to ${filePath}`);
    })
    .catch(error => {
      // Handle errors if any alert creation fails
      console.error('Error creating alerts:', error);
    })
});