var api = require('./app');

var category = 'all'


// api.getAll(category, (product, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log("Cat")
//     console.log(category, product);
//     return product;
// });


api.getItem('sweatshirts/riywuemd0/yy8sbq0kn', (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(category, product);
    return product;
});