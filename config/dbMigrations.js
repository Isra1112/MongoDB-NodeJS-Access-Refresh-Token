const User = require('../src/models/user.model');

const connection = require('./dbConn');
const mongoose = require('mongoose')


console.log(connection.mongoUri)

// mongoose
//     .connect(connection.mongoUri)
//     .then(() => {
//         console.log("mongoDB Connected")
//         await User.create({
//             name : "isra",
//             email : "isra@email.com",
//             password : bcrypt.hashSync("isra123", 8)
//         })
//     })
//     .catch((err) => console.log(err));

// async function migration(){
    
    

//     // dbAssociation();
//     // await connection.sync({force: true});
    
//     // let role01 = await Roles.create({
//     //     role:"admin",
//     // })
//     // let role02 = await Roles.create({
//     //     role:"doctor",
//     // })

//     // let Module01 = await Modules.create({
//     //     moduleName:"profile"
//     // })

//     // let Module02 = await Modules.create({
//     //     moduleName:"Dashboard"
//     // })

//     // let user01 = await User.create(
//     //     {userName:'isra', userPassword:'123123',fullName: 'Isra khairul', email: 'isra@example.com'}
//     // );

//     // let user02 = await User.create(
//     //     {userName:'dr', userPassword:'123123',fullName: 'Dr. Dummy', email: 'dr@example.com'}
//     // );

//     // user01.setRole(role01);
//     // user02.setRole(role02);
    
//     // let RoleModule01 = await RoleModules.create({});

//     //RoleModule01.setModule(Module01)

//     //RoleModule01.setRole(role01);
//     //RoleModule01.setModule(Module01);
// }


