const express = require('express');
const serverless = require('serverless-http');
const app = express();
const request = require('request');
const axios = require('axios');
const router = express.Router();
app.set('json spaces', 0);
router.get('/worldData',(req,res)=>{
    // request('https://2019ncov.asia/api/country_region',(error,response,body)=>{
    //     if(!error && response.statusCode == 200){
    //       res.send(body);
    //     }
    //   })
    axios.get('https://2019ncov.asia/api/country_region')
    .then(resp=> res.json(resp.data))
    .catch(err=> {console.log(err)});
});

router.get('/countryData/:country',(req,res)=>{
    let country = req.params.country;
    request(`https://corona.lmao.ninja/v2/countries/${country}?yesterday=true`,(error,response,body)=>{
      if(!error && response.statusCode == 200){
        res.send(body);
      }
    })
});

router.get('/historicalData/:country',(req,res)=>{
    let country = req.params.country;
    request(`https://corona.lmao.ninja/v2/historical/${country}?lastdays=60`,(error,response,body)=>{
      if(!error && response.statusCode == 200){
        res.send(body);
      }
    })
});



app.use('/.netlify/functions/api',router);

module.exports.handler = serverless(app);

