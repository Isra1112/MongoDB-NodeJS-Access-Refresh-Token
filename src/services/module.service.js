const Module = require('../models/module.model')
const respon = require('../helper/responJson');

class ModuleServ{
    async addModule(body){
        let result;
        try {
            const newModule = new Module({ 
                name : body.name
            });
            let data = await Module.create(newModule)
            let responseTemplate = new respon(200,"Success Create Module",data)
            result = JSON.stringify(responseTemplate,null,2)
        } catch (error) {
            throw new Error(error)
        }
        return result
    }
    async findAllModule(){
        let result;
        try {
            let data = await Module.find()
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
            let data = await Module.findById(body,'name')
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
        // let isDefault = /true/g;
        var regexQuery = {
            name: new RegExp(query.name, 'i')
        };
        
        var pagging = {
            page: parseInt(query.page-1, 10) || 0,
            limit: parseInt(query.limit, 10) || 10
        }
        try {
            let data = await Module.find(regexQuery)
            .skip(pagging.page * pagging.limit)
            .limit(pagging.limit)
            let responTemplate = new respon(200,"Success Search Role",data)
            responTemplate.page = pagging.page
            responTemplate.pageLimit = pagging.limit
            responTemplate.count = await Module.countDocuments(regexQuery)
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }

    async editModule(body){
        let result;
        try {
            let data = await Module.findByIdAndUpdate(body._id,body,{new:true})
            let responseTemplate = new respon(200,"Success Update Module",data)
            result = JSON.stringify(responseTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }
    async deleteModule(body){
        let result;
        try {
            let data = await Module.findByIdAndRemove(body._id)
            let responTemplate;
            if (data){
                responTemplate = new respon(200,"Success Delete Module",data)
            }
            else{
                responTemplate = new respon(201,"Not Found Module ID",data)
            }
            
            result = JSON.stringify(responTemplate,null,2)
        } 
        catch (error) {
            throw new Error(error)
        }
        return result
    }
}

module.exports = ModuleServ;