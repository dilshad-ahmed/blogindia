class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            $or: [
                {
                    title: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                }
            ]
        } : {}

        // console.log(keyword)
        this.query = this.query.find({ ...keyword })
        return this
    }
}




module.exports = ApiFeatures;