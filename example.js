var api = require('./app');

const categories = {
    all: 'all',
    sweatshirts: 'sweatshirts',
    item: 'sweatshirts/riywuemd0/yy8sbq0kn'
}


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
    console.log(`${product} found`);
});