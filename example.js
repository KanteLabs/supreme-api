var api = require('./app');

var category = 'all'


api.getAll(category, (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(category, product);
});

