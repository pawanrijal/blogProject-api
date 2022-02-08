const { blog } = require("../lib/databaseConnection");

class BlogService {
    async create(payload) {
        const returnData = await blog.create(payload);
        return returnData;
    }

    async update(payload, id) {
        const returnData = await blog.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await blog.findAll();
        return returnData;
    }

    async findById(id) {
        const returnData = await blog.findOne({ where: { id } });
        return returnData;
    }
    async delete(id){
        const returnData=await blog.destroy({where:{id}});
        return returnData;
    }
}

module.exports = new BlogService();