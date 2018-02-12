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

api.getAll = (category, callback) => {
    if(category === 'all' || 'new')
        options.uri += `/shop/${category}/`;
    else{
        options.uri += `/shop/all/${category}/`;
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

api.getItem = (category, callback) => {
    options.uri += `/shop/${category}`;

    rp(options)
        .then(($)=>{
            console.log(`found: ${$('#details h1').text()}`)
            grabProductData($);
            return $;
        })
        .catch((err)=>{
            if(err.statusCode === 404){
                console.log('error: 404 supreme webshop is closed. check back later')
                callback(null, err.statusCode)
            }
            return err;
        })

    grabProductData = (productHTML)=> {
        let name = productHTML('h1.protect').text();
        let main_image = `http:${productHTML('#img-main').attr('src')}`;
        let variations = [];

        productHTML('.styles li a').each((i, element) => {
            variations.push(element.attribs);
        });

        let productData = {
            name: name,
            color: productHTML('p.style.protect').text(),
            price: productHTML('p.price span').text(),
            main_image: main_image,
            category: productHTML('h1.protect').attr('data-category'),
            date: productHTML('h1.protect').attr('data-rd'),
            season: productHTML('h1.protect').attr('data-ino'),
            description: productHTML('p.description').text(),
            variations: variations,
        }
        callback(productData);
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
                }
            )
        })
        callback(itemObject)
    }

    options.uri = url;
}

module.exports = api;