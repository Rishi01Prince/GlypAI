const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const mongoURI = process.env.DATABASE.replace('<DATABASE_USERNAME>' , process.env.DATABASE_USERNAME).replace('<DATABASE_PASSWORD>' , process.env.DATABASE_PASSWORD);

const mongoDB = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        // useCreateIndex: true, 
        // useFindAndModify: false,
    }, connect);
};


const connect = async (err, result) => {

    if (err) console.log("---" + err)
    else {
        console.log("connected to mongo")
        const vechicleCollection = await mongoose.connection.db.collection("VechicleData");
        vechicleCollection.find({}).toArray( async function (err, data) { //callback function
            //Fetchinng the VechicleCatetegory Collection from Instant Hunt Database
            const VechicleRelated = await mongoose.connection.db.collection("VechicleCategory");
            VechicleRelated.find({}).toArray(async function (err, catData) {
             
                if (err) {
                    console.log(err);
                }
                else {
                    global.VechicleData = data;
                    global.VechicleCategory = catData;
                    // console.log(global.VechicleCategory);
                }
            })
        });
    }
}





module.exports = mongoDB();
