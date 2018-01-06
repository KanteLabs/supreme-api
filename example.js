var supreme = require('./app');

// Find Product Based on Keywords
const keywords = "Small Box";
const style = 'White';
const category = 'new';

// supreme.seek(category, keywords, style, (product, err) => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     console.log(product);
// });


supreme.getItems('accessories', (product, err) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(product);
});

