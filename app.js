const rp = require('request-promise');
const cheerio = require('cheerio');
const axios = require('axios')

const url = 'http://www.supremenewyork.com';

const options = {
    uri: url,
    transform: function(body) {
        return cheerio.load(body);
    }
}

var api = {};

api.getAll = (category, callback) => {
    if(category === 'all' || category === 'new'){
        options.uri += `/shop/${category}/`;

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
    }else{

        options.uri += '/mobile_stock.json';

        async function getProducts() {
            try {
                const response = await axios.get(options.uri, {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
                    }
                });
                let categoryData = response.data.products_and_categories[`${category}`];
                callback(categoryData, category)
            } catch (error) {
                console.error(error)
                callback(null, null, error)
            }
        }
        getProducts()
    }
    
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
            let stockCount = 0;
            product.styles.map((style, i)=>{
                stockCount = stockBySize(style, product);
            })
            callback(product, stockCount)
        }else{
            let stockCount = product.styles[0].sizes[0].stock_level;

            callback(product, stockCount);
        }
    }

    stockBySize = (style, product) => {
        let stockCount = 0;
        style.sizes.map((size, x)=>{
            !size.stock_level ? stockCount++ : null;
        })
        if(stockCount === style.sizes.length){
            return 0;
        }else{
            return (style.sizes.length - stockCount);
        }
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