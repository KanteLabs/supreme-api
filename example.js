var api = require('./app');

var category = 'all'


api.getAllItems(category, (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(product);
});

