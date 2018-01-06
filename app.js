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

api.getAll = (category, callback) =>{
    options.uri += `/shop/${category}/`;

    // '$' is used by cheerio to represent data retrieved 
    rp(options).then(($)=>{
        // console.log($)
        console.log($('img').length)
        return $;
    }).catch((err=>{
        console.log(err)
        return err;
    }))
}

module.exports = api;