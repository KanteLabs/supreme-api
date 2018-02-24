const options = require('./options')
const api = require('./app');

// api.getAll(options.all, (products, category, err) => {
//     if (err) {
//         console.log('error: ' + err);
//         return err;
//     }else{
//         console.log(`${products} found in ${category}`);
//     }
// });

// api.getItem("171160", (product, stockStatus, err) => {
//     if (err) {
//         console.log('error: ' + err);
//         return err;
//     }else{
//         console.log(`found item: ${product.ino} and stock count is ${stockStatus}`);
//         return product;
//     }
// });

api.getAll(options.category.jackets, (products, category, err) => {
    if (err) {
        console.log('error: ' + err);
        return err;
    }else{
        console.log(`${products} found in ${category}`);
    }
});

// api.getRandom((res, err)=>{
//     if (err) {
//         console.log('error: ' + err);
//         return err;
//     }else{
//         // console.log(res);
//         return res;
//     }
// })