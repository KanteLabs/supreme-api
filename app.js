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
        console.log(err.statusCode)
        callback(null, null, err.statusCode)
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
            console.log(`error: ${err.statusCode}`)
            callback(null, err.statusCode)
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

module.exports = api;