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
        callback( $('img').length)
        return $;
    }).catch((err=>{
        console.log(err)
        callback(null, err)
        return err;
    }))

    //Resets uri for next query
    options.uri = url;
}

api.getItem = (category, callback) => {
    let product = {};
    options.uri += `/shop/${category}`;

    rp(options)
        .then(($)=>{
            console.log(`found: ${$('#details h1').text()}`)
            product[$('#details h1').text()] = $('#container').html();
            return $;
        })
        .catch((err)=>{
            console.log(`error: ${err.statusCode}`)
            console.log(err)
            return err;
        })

    grabProductData = (product)=> {
        callback(product);
    }

    options.uri = url;
}

module.exports = api;