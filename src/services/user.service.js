const User = require('../models/user.model')
const bcrypt = require("bcryptjs");
const respon = require('../helper/responJson');


class UserServ{
    async addUser(body){
        let result;
        try {
            const newUser = new User({ 
                name : body.name,
                email : body.email,
                password : bcrypt.hashSync(body.password, 8)
            });
            let data = await User.create(newUser)
            let responseTemplate = new respon(200,"Success Create User",data)
            result = JSON.stringify(responseTemplate,null,2)
            // result = data
        } catch (error) {
            throw new Error(error)
        }
        return result
    }
    async findAllUser(){
        let result;
        try {
            let data = await User.find()
            let responTemplate = new respon(200,"Success",data)
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }

    async findByID(body){
        let result;
        try {
            let data = await User.findById(body,'name password')
            let responTemplate = new respon(200,"Success",data)
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }

    async searchQuery(query){
        let result;
        var regexQuery = {
            name: new RegExp(query.name, 'i'),
            email: new RegExp(query.email, 'i')
        };
        var pagging = {
            page: parseInt(query.page-1, 10) || 0,
            limit: parseInt(query.limit, 10) || 10
        }
        try {
            console.log(1)
            let data = await User.find(regexQuery)
            .skip(pagging.page * pagging.limit)
            .limit(pagging.limit)
            let responTemplate = new respon(200,"Success Search User",data)
            responTemplate.page = pagging.page
            responTemplate.pageLimit = pagging.limit
            responTemplate.count = await User.countDocuments(regexQuery)
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }

    async editUser(body){
        let result;
        try {
            let data = await User.findByIdAndUpdate(body._id,body,{new:true})
            let responseTemplate = new respon(200,"Success Update User",data)
            result = JSON.stringify(responseTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }
    async deleteUser(body){
        let result;
        try {
            let data = await User.findByIdAndRemove(body._id)
            let responTemplate;
            if (data){
                responTemplate = new respon(200,"Success Delete User",data)
            }
            else{
                responTemplate = new respon(201,"Not Found User ID",data)
            }
            
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }
}

module.exports = UserServ;