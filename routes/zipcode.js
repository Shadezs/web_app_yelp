const express = require('express');
const axios = require('axios');
const router = express.Router();

/*  GET zipcode page  */

router.get('/', (req, res, next) => {
  res.render('businesses/zipcodepage.ejs', { title: 'Zip Code Page' });
});

/* GET yelpJSON.businesses */
/*router.get('/:userzip', async (req, res, next) => {
  const { userzip } = req.params;
  console.log("Post request received");

  var config = {
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + userzip + '&price=1&sort_by=rating&limit=10',
    headers: {
      'Authorization': 'Bearer dfeBZkngziUaBNGBh9N05JV7npLPtIFq2vhmqVRiUrEO3XAVnZHyjxvxCQraXCbQCP5lmeaU3Yho9ae_NV5Vsh3f539FFXTnVctpYrTJuojBwU25A9V-btTg17spX3Yx'
    }
  };


  try {

    const { data: yelpJSON } = await axios(config);

    const businesses = yelpJSON.businesses;
    //console.log(businessesArray);
    //console.log(yelpJSON);
    res.render('businesses/restaurants.ejs', {
      businesses,
    });

  } catch (e) {
    console.log(e);
  }

});*/

/* GET yelpJSON.businesses */
router.post('/', async (req, res, next) => {
  const userzip = req.body.userzip;
  console.log("Post request received");
  console.log(req.body.userzip);

  var config = {
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=' + userzip + '&price=1&sort_by=rating&limit=10',
    headers: {
      'Authorization': 'Bearer dfeBZkngziUaBNGBh9N05JV7npLPtIFq2vhmqVRiUrEO3XAVnZHyjxvxCQraXCbQCP5lmeaU3Yho9ae_NV5Vsh3f539FFXTnVctpYrTJuojBwU25A9V-btTg17spX3Yx'
    }
  };
  console.log(config.url);

  try {

    const { data: yelpJSON } = await axios(config);

    const businesses = yelpJSON.businesses;
    //console.log(businessesArray);
    //console.log(yelpJSON);
    res.render('businesses/restaurants.ejs', {
      businesses,
    });

  } catch (e) {
    console.log(e);
  }

});




module.exports = router;
