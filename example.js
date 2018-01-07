var categories = require('./options')
var api = require('./app');

api.getAll(categories.all, (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(`${product} found in ${categories.all}`);
});


api.getItem(categories.item, (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(product);
});

api.getAll(categories.category.shirts, (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(product);
});