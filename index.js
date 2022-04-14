const server = require('./config/server');
const port = '8000';
const connection = require('./config/dbConn');
const mongoose = require('mongoose')

mongoose
    .connect(connection.mongoUri)
    .then(() => {
        console.log("mongoDB Connected")
        server.listen(3212,'0.0.0.0',function(){
            if(server.listening){
                console.log("server on");
            }
        })
    })
    .catch((err) => console.log(err));