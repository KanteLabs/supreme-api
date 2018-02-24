var options = require('./options')
var api = require('./app');

api.getAll(options.all, (product, category, err) => {
    if (err) {
        console.log('error: ' + err);
        return err;
    }else{
        console.log(`${product} found in ${category}`);
    }
});

api.getItem("171160", (product, stockStatus, err) => {
    if (err) {
        console.log('error: ' + err);
        return err;
    }else{
        console.log(`found item: ${product.ino}`);
        return product;
    }
});

api.getAll(options.category.sweatshirts, (product, category, err) => {
    if (err) {
        console.log('error: ' + err);
        return err;
    }else{
        console.log(`${product} found in ${category}`);
    }
});

api.getRandom((res, err)=>{
    if (err) {
        console.log('error: ' + err);
        return err;
    }else{
        // console.log(res);
        return res;
    }
})