const request = require('request');
const apiOptions = {
 server: 'http://localhost:3000'
}

// internal method to render the travel list
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';
    if (!(responseBody instanceof Array)) {
        mesasge = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database!';
        }
    }
    res.render('travel',
        {
            title: pageTitle,
            trips: responseBody,
            message
        }
    );
}

// GET travel list view 
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    console.info('>> travelController.travelList calling ' + requestOptions.url);
    request(
        requestOptions,
        (err, { statuscode }, body) => {
            if (er) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );
};

/* var fs = require('fs');

var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// GET travel view
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips });
};

module.exports = {
    travel
}; */