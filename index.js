const axios = require('axios');

var express = require('express');
const dotenv = require('dotenv').config();
var app = express();

app.get('/', function (req, res) {
    getToken(req, res);
});

app.listen(process.env.PORT, function() {
    console.log('Aplicación ejemplo, escuchando el puerto ' + process.env.PORT);
});

async function getToken(req, res) {
    const body = new URLSearchParams()
    body.append('grant_type', 'client_credentials')
    const options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + process.env.TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: body
    };
    
    axios(options)
    .then( ({data}) => {
        return res.json({
            token: data.access_token
        })
    })
    .catch(err => console.log(err.response));
    
}