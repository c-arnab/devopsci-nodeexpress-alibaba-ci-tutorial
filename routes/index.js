var express = require('express');
var router = express.Router();
const http = require('http');


/* GET home page. */
router.get('/', function(req, res, next) {
  let titletext = '';
  let wtext = '';
  http.get('http://mywebapi-svc:5000/api/values', (apires) => {
    const { statusCode } = apires;
    const contentType = apires.headers['content-type'];
  
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      apires.resume();
      return;
    }
  
    apires.setEncoding('utf8');
    let rawData = '';
    apires.on('data', (chunk) => { rawData += chunk; });
    apires.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        titletext=parsedData[1];
        wtext=parsedData[0];
        res.render('index', { title: titletext, data:wtext });
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    res.render('index', { title: titletext, data:wtext });
  });
  

  
});

module.exports = router;
