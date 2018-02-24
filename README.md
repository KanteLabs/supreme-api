# Supreme API Wrapper
I decided to create a Node.js API for [supremenewyork.com](http://www.supremenewyork.com/), in order to help users keep track of items, that are currently in stock or sold out. This API can be expanded to work with other projects centered around e-commerce, from automatic check out bots, to site monitors. 


## How to install
1. clone or download and run ```npm install ```
2. Where you want to use the API, you must first require it. 
    ```javascript
    const options = require('./options')
    const api = require('./app');
    ```

## Features
Requests:
- [ ] All Items
- [x] Single Item
- [x] Fetch by Categories
- [ ] Fetch by New
- [x] /random/
- [x] Check if Shop is Open


Example to fetch a product. All you have to pass to the API is the product id.

```javascript
api.getItem("171200", (product, stockStatus, err) => {
    if (err) {
        console.log('error: ' + err);
        return err;
    }else{
        console.log(`found item: ${product.ino} and stock count is ${stockStatus}`);
        return product;
    }
});
```

Example to fetch by category. You can change the category from sweatshirts, to any of the 11 categories supreme uses. 

```javascript
api.getAll(options.category.sweatshirts, (product, category, err) => {
    if (err) {
        console.log('error: ' + err);
        return err;
    }else{
        console.log(`${product} found in ${category}`);
    }
});
```

## Future Improvements
* Watch certain items function
    * watch a category

## Contribution
Want to make a contribution? Fork the repo, add your changes, and submit a pull request. Any type of contributions (ideas, bug fixes, fixing typos, etc.) will be appreciated!


## License
supreme-api-wrapper is licensed under [MIT License](https://github.com/KanteLabs/supreme-api-wrapper/blob/master/LICENSE).
