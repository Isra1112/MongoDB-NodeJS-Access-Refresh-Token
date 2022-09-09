const Role = require('../models/role.model')
const respon = require('../helper/responJson');

class RoleServ{
    async addRole(body){
        let result;
        try {
            const newRole = new Role({ 
                name : body.name,
                default : body.default
            });
            let data = await Role.create(newRole)
            let responseTemplate = new respon(200,"Success Create Role",data)
            result = JSON.stringify(responseTemplate,null,2)
            // result = data
        } catch (error) {
            throw new Error(error)
        }
        return result
    }
    async findAllRole(){
        let result;
        try {
            let data = await Role.find()
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
            let data = await Role.findById(body,'name')
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
        let isDefault = /true/g;
        console.log(query.default)
        var regexQuery = {
            name: new RegExp(query.name, 'i'),
            default: query.default || 'true'
        };
        regexQuery.default = isDefault.test(regexQuery.default)
        
        var pagging = {
            page: parseInt(query.page-1, 10) || 0,
            limit: parseInt(query.limit, 10) || 10
        }
        try {
            let data = await Role.find(regexQuery)
            .skip(pagging.page * pagging.limit)
            .limit(pagging.limit)
            let responTemplate = new respon(200,"Success Search Role",data)
            responTemplate.page = pagging.page
            responTemplate.pageLimit = pagging.limit
            responTemplate.count = await Role.countDocuments(regexQuery)
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }

    async editRole(body){
        let result;
        try {
            let data = await Role.findByIdAndUpdate(body._id,body,{new:true})
            let responseTemplate = new respon(200,"Success Update Role",data)
            result = JSON.stringify(responseTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }
    async deleteRole(body){
        let result;
        try {
            let data = await Role.findByIdAndRemove(body._id)
            let responTemplate;
            if (data){
                responTemplate = new respon(200,"Success Delete Role",data)
            }
            else{
                responTemplate = new respon(201,"Not Found Role ID",data)
            }
            
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }
}

module.exports = RoleServ;