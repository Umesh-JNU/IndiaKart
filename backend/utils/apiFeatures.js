class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr}

        // Removing field for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        // filter for price
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    pagination(itemPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = itemPerPage * (currentPage - 1);
        
        this.query = this.query.limit(itemPerPage).skip(skip);
        return this;
    } 
}

module.exports = APIFeatures

// curl -X POST http://localhost:4000/api/v1/products/new -H 'Content-Type: application/json' -d '{"name": "product3", "price":1200, "description":"this is a product", "image":{"public_id":"sample image", "url": "sampleurl"}, "stock": 5, "category":"laptop"}'