const Product = require('../models/models')

const getAllProductsStatic = async (req, res)=>{
    // throw new Error('testing async errors') 
    const products = await Product.find({price: {$gt: 30}}).sort('price ') 
    res.status(200).json({products});
}


const getAllProducts = async (req, res)=>{
    const {featured, company, price, name, rating, sort, numericFilters} = req.query;


    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'? true : false
    }

    if(company){
        queryObject.company = company;
    }

    if(price){
        queryObject.price = price;
    }

    if(name){
        queryObject.name = {$regex: name, $options: 'i'};
    }


    if(numericFilters){
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '<' : '$lt',
            '<=' : '$lte',
            '=' : '$eq',
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        console.log(filters)
    }

    // if(company){
    //     queryObject.company = company;
    // }

    console.log(queryObject);
    let result = Product.find(queryObject)
    if(sort){
        // products = products.sort()
        const sortList = sort.split(',').join(' ');
        result = result.find(sortList)
    }else{
        result.sort('createdAt')
    }
    const products = await result;
    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic}