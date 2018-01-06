const rp = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://www.supremenewyork.com';

const options = {
    uri: url,
    transform: function(body) {
        return cheerio.load(body);
    }
}

var api = {};

api.getAllItems = function(category){
    options.uri += `/shop/${category}/`;
    rp(options).then((res)=>{
        console.log(res)
    }).catch((err=>{
        console.log(err)
    }))
}

module.exports = api;