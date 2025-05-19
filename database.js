const { MongoClient, Collection } = require('mongodb');
async function main(){
const uri = "mongodb+srv://aarushidhruv:5z0dlv2R7UkI7qPO@build-together.hwjwire.mongodb.net/";
const client = new MongoClient(uri);

 try {
        // Connect to the MongoDB cluster
        await client.connect();
 console.log("connected to the db server");
        // Make the appropriate DB calls
        const db=client.db("hello_world");
        const collection=db.collection("hey");
        const res=await collection.find({}).toArray();
        console.log(res);
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};