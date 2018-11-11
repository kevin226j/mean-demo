require('dotenv').config();
module.exports = {
    localURL : `mongodb://localhost:27017/${process.env.LOCAL_DB_NAME}`,

    atlasURL: process.env.MONGO_ATLAS_URI
}