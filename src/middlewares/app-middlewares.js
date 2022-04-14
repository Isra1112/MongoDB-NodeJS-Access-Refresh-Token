const express = require('express');
const router = express.Router();

router.use(express.json());


module.exports = router;




// const { MongoClient } = require("mongodb");

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://isra:isra123@cluster0.fxmzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();

//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };

//     const update = {
//         $set :{
//           plot:"Edit plot"  
//         }
//     }
//     const movie = await movies.updateOne(query,update);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);