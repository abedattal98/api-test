// const express = require('express');
// const bodyParser = require('body-parser');
// // const { MongoClient } = require('mongodb');
// // const client = new MongoClient(uri);

// // create express app
// const app = express();

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
// app.use(bodyParser.json())
const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://abedattal98:w18w4KYFWDjv9gJk@cluster0.enft9.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
    const dbConfig = require('./config/database.config.js');


    const client = new MongoClient(dbConfig.url);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}
// main().catch(console.error);

// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

// require('./app/routes/note.routes.js')(app);

// // listen for requests
// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });
main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
