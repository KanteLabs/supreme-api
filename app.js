const rp = require('request-promise');
const cheerio = require('cheerio');
const axios = require('axios')

const url = 'https://www.supremenewyork.com';

const options = {
    uri: url,
    transform: function(body) {
        return cheerio.load(body);
    }
}

var api = {};

api.getAll = (category, callback) => {
    if(category === 'all' || 'new')
        options.uri += `/shop/${category}/`;
    else{
        options.uri += `/mobile/#categories/${category}/`;
    }

    // '$' is used by cheerio to represent data retrieved 
    rp(options).then(($)=>{
        callback($('img').length, category)
        return $;
    }).catch((err=>{
        if(err.statusCode === 404){
            console.log('error: 404 supreme webshop is closed. check back later')
            callback(null, null, err.statusCode)
        }
        return err;
    }))

    //Resets uri for next query
    options.uri = url;
}

api.getItem = (itemId, callback) => {
    options.uri += `/shop/${itemId}.json`;

    axios.get(options.uri).then((res)=>{
        checkStock(res.data)
        return res.data;
    }).catch(err=>{
        callback(null, null, err)
        return err;
    })

    checkStock = (product) => {
        if(product.styles.length > 1 ) {
            product.styles.map((style, i)=>{
                stockBySize(style)
            })
        }
    }

    stockBySize = (style) => {
        let stockCount = 0;
        style.sizes.map((size, x)=>{
            !size.stock_level ? stockCount++ : null;
        })

        stockCount === style.sizes.length ? callback()
    }

    options.uri = url;
}

api.getRandom = (callback) => {
    options.uri += '/random/';

    rp(options).then(($)=>{
        console.log(`Found ${$('div.random-item').length} in Random`)
        grabRandomItemInfo($);
        return $;
    }).catch((err=>{
        if(err.statusCode === 404){
            console.log('error: page not found')
            callback(null, err.statusCode)
        }
        return err;
    }))

    grabRandomItemInfo = ($) => {
        let itemObject = [];
        $('div.random-item').each((i, element)=>{
        let name = $(element).find('span.caption').text();
            itemObject.push(
            name = {
                name: $(element).find('span.caption').text(),
                href: $(element).find('a').attr('href'),
                img: `http:${$(element).find('img').attr('src')}`
            })
        })
        callback(itemObject)
    }

    options.uri = url;
}

module.exports = api;