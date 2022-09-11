const User = require('../models/user.model')
const bcrypt = require("bcryptjs");
const respon = require('../helper/responJson');
const Role = require('../models/role.model');


class UserServ{
    async addUser(body){
        let result;
        try {
            const newUser = new User({ 
                name : body.name,
                email : body.email,
                password : bcrypt.hashSync(body.password, 8),
                roles: body.role_id 
            });
            let data = await User.create(newUser)
            let responseTemplate = new respon(200,"Success Create User",data)
            result = JSON.stringify(responseTemplate,null,2)
        } catch (error) {
            throw new Error(error)
        }
        return result
    }

    async findAllUser(){
        let result;
        try {
            let data = await User.find().populate({
                path    : 'roles',
                populate: { path: 'modules'}
           });
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
            let data = await User.findById(body).populate({
                path    : 'roles',
                populate: { path: 'modules'}
                
           });
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
            email: new RegExp(query.email, 'i'),
            // roles: {
            //     name : new RegExp(query.roles, 'i')}
        };
        var pagging = {
            page: parseInt(query.page-1, 10) || 0,
            limit: parseInt(query.limit, 10) || 10
        }
        try {
            let data = await User.find(regexQuery)
            .populate({
                path    : 'roles',
                populate: { path: 'modules'}
                
           })
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
    async addRoleToUser(body){
        let result;
        try {
            let dataUser = await User.findById(body.user_id)
            let dataRole = await Role.findById(body.role_id)
            dataUser.roles.push(dataRole._id)
            let addedUserRole = await User.findByIdAndUpdate(body.user_id,dataUser,{new:true})
            let responseTemplate = new respon(200,"Success Add Role To User",addedUserRole)
            result = JSON.stringify(responseTemplate,null,2)
        } catch (error) {
            throw new Error(error)
        }
        return result
    }
    async deleteRoleInUser(body){
        let result;
        try {
            let dataUser = await User.findById(body.user_id)
            let dataRole = await Role.findById(body.role_id)
            dataUser.roles = dataUser.roles.filter(item => JSON.stringify(item) !== JSON.stringify(dataRole._id))
            let deletedUserRole = await User.findByIdAndUpdate(body.user_id,dataUser,{new:true})
            let responseTemplate = new respon(200,"Success Delete Role",deletedUserRole)
            result = JSON.stringify(responseTemplate,null,2)
        } catch (error) {
            throw new Error(error)
        }
        return result
    }
}

module.exports = UserServ;